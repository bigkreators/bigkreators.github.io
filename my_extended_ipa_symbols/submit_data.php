<?php
// SQLite database - creates database.db file automatically
$database_file = 'database.db';

try {
    $pdo = new PDO("sqlite:$database_file");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create tables if they don't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS discussion_topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS proposals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symbol TEXT NOT NULL,
            sound_name TEXT NOT NULL,
            category TEXT NOT NULL,
            rationale TEXT NOT NULL,
            example_language TEXT,
            symbol_image TEXT,
            audio_sample TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");
    
} catch(PDOException $e) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed']));
}

// Handle POST requests (form submissions)
if ($_POST) {
    $type = $_POST['type'] ?? '';
    
    if ($type === 'feedback') {
        // Handle feedback/discussion topic submission
        $name = htmlspecialchars(trim($_POST['name'] ?? 'Anonymous'));
        $email = htmlspecialchars(trim($_POST['email'] ?? ''));
        $topic_title = htmlspecialchars(trim($_POST['topic_title'] ?? ''));
        $message = htmlspecialchars(trim($_POST['message'] ?? ''));
        
        if (!empty($topic_title) && !empty($message)) {
            $stmt = $pdo->prepare("INSERT INTO discussion_topics (name, email, title, message) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $email, $topic_title, $message]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Title and message are required']);
        }
        
    } elseif ($type === 'proposal') {
        // Handle proposal submission
        $symbol = htmlspecialchars(trim($_POST['symbol'] ?? ''));
        $sound_name = htmlspecialchars(trim($_POST['sound_name'] ?? ''));
        $category = htmlspecialchars(trim($_POST['category'] ?? ''));
        $rationale = htmlspecialchars(trim($_POST['rationale'] ?? ''));
        $example_language = htmlspecialchars(trim($_POST['example_language'] ?? ''));
        
        if (!empty($symbol) && !empty($sound_name) && !empty($rationale)) {
            // Handle file uploads
            $symbol_image_path = '';
            $audio_sample_path = '';
            
            if (isset($_FILES['symbol_image']) && $_FILES['symbol_image']['error'] === 0) {
                $upload_dir = 'uploads/images/';
                if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
                $symbol_image_path = $upload_dir . uniqid() . '_' . $_FILES['symbol_image']['name'];
                move_uploaded_file($_FILES['symbol_image']['tmp_name'], $symbol_image_path);
            }
            
            if (isset($_FILES['audio_sample']) && $_FILES['audio_sample']['error'] === 0) {
                $upload_dir = 'uploads/audio/';
                if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
                $audio_sample_path = $upload_dir . uniqid() . '_' . $_FILES['audio_sample']['name'];
                move_uploaded_file($_FILES['audio_sample']['tmp_name'], $audio_sample_path);
            }
            
            $stmt = $pdo->prepare("INSERT INTO proposals (symbol, sound_name, category, rationale, example_language, symbol_image, audio_sample) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$symbol, $sound_name, $category, $rationale, $example_language, $symbol_image_path, $audio_sample_path]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Symbol, sound name, and rationale are required']);
        }
    }
}

// Handle GET requests (loading data)
elseif (isset($_GET['action'])) {
    $action = $_GET['action'];
    
    if ($action === 'get_topics') {
        // Return discussion topics as HTML
        $stmt = $pdo->query("SELECT * FROM discussion_topics ORDER BY created_at DESC LIMIT 20");
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($topics as $topic) {
            echo '<div class="topic">';
            echo '<div class="topic-header">';
            echo '<h4 class="topic-title">' . $topic['title'] . '</h4>';
            echo '<span class="topic-meta">Posted by ' . $topic['name'] . ' on ' . date('M j, Y', strtotime($topic['created_at'])) . '</span>';
            echo '</div>';
            echo '<div class="topic-content">';
            echo '<p>' . nl2br($topic['message']) . '</p>';
            echo '</div>';
            echo '<div class="topic-actions">';
            echo '<button class="btn reply-btn" onclick="toggleReplyForm(this)">Reply</button>';
            echo '</div>';
            echo '</div>';
        }
        
    } elseif ($action === 'get_proposals') {
        // Return proposals as HTML
        $stmt = $pdo->query("SELECT * FROM proposals ORDER BY created_at DESC LIMIT 50");
        $proposals = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($proposals)) {
            echo '<div class="no-proposals">No proposals yet. Be the first to propose a new symbol!</div>';
        } else {
            foreach ($proposals as $proposal) {
                echo '<div class="proposal-item" data-category="' . $proposal['category'] . '">';
                echo '<div class="proposal-header">';
                echo '<h4>' . $proposal['sound_name'] . '</h4>';
                echo '<span class="proposal-category">' . ucfirst($proposal['category']) . '</span>';
                echo '</div>';
                echo '<div class="proposal-content">';
                echo '<p><strong>Symbol:</strong> ' . $proposal['symbol'] . '</p>';
                echo '<p><strong>Rationale:</strong> ' . nl2br($proposal['rationale']) . '</p>';
                if (!empty($proposal['example_language'])) {
                    echo '<p><strong>Example Languages:</strong> ' . $proposal['example_language'] . '</p>';
                }
                if (!empty($proposal['symbol_image'])) {
                    echo '<p><strong>Image:</strong> <img src="' . $proposal['symbol_image'] . '" alt="Symbol image" style="max-width: 100px;"></p>';
                }
                if (!empty($proposal['audio_sample'])) {
                    echo '<p><strong>Audio:</strong> <audio controls><source src="' . $proposal['audio_sample'] . '"></audio></p>';
                }
                echo '<small>Submitted on ' . date('M j, Y', strtotime($proposal['created_at'])) . '</small>';
                echo '</div>';
                echo '</div>';
            }
        }
    }
}
?>
