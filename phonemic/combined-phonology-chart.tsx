import React, { useState, useEffect } from 'react';

const CombinedPhonologyChart = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activePhoneme, setActivePhoneme] = useState(null);
  const [viewMode, setViewMode] = useState('phonemic'); // 'phonemic' or 'phonetic'
  
  // Sample language data
  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'arabic', name: 'Arabic' },
    { id: 'mandarin', name: 'Mandarin Chinese' },
    { id: 'russian', name: 'Russian' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'swahili', name: 'Swahili' },
    { id: 'portuguese', name: 'Portuguese' },
    { id: 'korean', name: 'Korean' },
    { id: 'german', name: 'German' },
    { id: 'italian', name: 'Italian' },
    { id: 'turkish', name: 'Turkish' }
  ];
  
  // Phoneme data by language (same as your existing data)
  const phonemeData = {
    english: {
      consonants: [
        [
          { symbol: 'p', example: 'pen', ipa: 'p', audio: 'pen.mp3', description: 'Voiceless bilabial plosive' },
          { symbol: 'b', example: 'book', ipa: 'b', audio: 'book.mp3', description: 'Voiced bilabial plosive' },
          null,
          null,
          { symbol: 'm', example: 'man', ipa: 'm', audio: 'man.mp3', description: 'Bilabial nasal' }
        ],
        [
          { symbol: 't', example: 'top', ipa: 't', audio: 'top.mp3', description: 'Voiceless alveolar plosive' },
          { symbol: 'd', example: 'dog', ipa: 'd', audio: 'dog.mp3', description: 'Voiced alveolar plosive' },
          { symbol: 's', example: 'sun', ipa: 's', audio: 'sun.mp3', description: 'Voiceless alveolar fricative' },
          { symbol: 'z', example: 'zoo', ipa: 'z', audio: 'zoo.mp3', description: 'Voiced alveolar fricative' },
          { symbol: 'n', example: 'net', ipa: 'n', audio: 'net.mp3', description: 'Alveolar nasal' }
        ],
        [
          { symbol: 'k', example: 'cat', ipa: 'k', audio: 'cat.mp3', description: 'Voiceless velar plosive' },
          { symbol: 'g', example: 'go', ipa: 'g', audio: 'go.mp3', description: 'Voiced velar plosive' },
          { symbol: 'ʃ', example: 'ship', ipa: 'ʃ', audio: 'ship.mp3', description: 'Voiceless postalveolar fricative' },
          { symbol: 'ʒ', example: 'measure', ipa: 'ʒ', audio: 'measure.mp3', description: 'Voiced postalveolar fricative' },
          { symbol: 'ŋ', example: 'ring', ipa: 'ŋ', audio: 'ring.mp3', description: 'Velar nasal' }
        ]
      ],
      vowels: [
        [
          { symbol: 'i:', example: 'see', ipa: 'i:', audio: 'see.mp3', description: 'Close front unrounded vowel' },
          null,
          { symbol: 'u:', example: 'blue', ipa: 'u:', audio: 'blue.mp3', description: 'Close back rounded vowel' }
        ],
        [
          { symbol: 'ɪ', example: 'sit', ipa: 'ɪ', audio: 'sit.mp3', description: 'Near-close near-front unrounded vowel' },
          { symbol: 'ə', example: 'about', ipa: 'ə', audio: 'about.mp3', description: 'Mid central vowel' },
          { symbol: 'ʊ', example: 'put', ipa: 'ʊ', audio: 'put.mp3', description: 'Near-close near-back rounded vowel' }
        ],
        [
          { symbol: 'e', example: 'bed', ipa: 'e', audio: 'bed.mp3', description: 'Open-mid front unrounded vowel' },
          { symbol: 'ʌ', example: 'cup', ipa: 'ʌ', audio: 'cup.mp3', description: 'Open-mid back unrounded vowel' },
          { symbol: 'ɔ:', example: 'call', ipa: 'ɔ:', audio: 'call.mp3', description: 'Open-mid back rounded vowel' }
        ],
        [
          { symbol: 'æ', example: 'cat', ipa: 'æ', audio: 'cat.mp3', description: 'Near-open front unrounded vowel' },
          null,
          { symbol: 'ɑ:', example: 'car', ipa: 'ɑ:', audio: 'car.mp3', description: 'Open back unrounded vowel' }
        ]
      ]
    },
    spanish: {
      consonants: [
        [
          { symbol: 'p', example: 'padre', ipa: 'p', audio: 'padre.mp3', description: 'Voiceless bilabial plosive' },
          { symbol: 'b', example: 'beso', ipa: 'b', audio: 'beso.mp3', description: 'Voiced bilabial plosive' },
          null,
          null,
          { symbol: 'm', example: 'madre', ipa: 'm', audio: 'madre.mp3', description: 'Bilabial nasal' }
        ],
        [
          { symbol: 't', example: 'toro', ipa: 't', audio: 'toro.mp3', description: 'Voiceless dental plosive' },
          { symbol: 'd', example: 'dedo', ipa: 'd', audio: 'dedo.mp3', description: 'Voiced dental plosive' },
          { symbol: 's', example: 'silla', ipa: 's', audio: 'silla.mp3', description: 'Voiceless alveolar fricative' },
          null,
          { symbol: 'n', example: 'noche', ipa: 'n', audio: 'noche.mp3', description: 'Alveolar nasal' }
        ],
        [
          { symbol: 'k', example: 'casa', ipa: 'k', audio: 'casa.mp3', description: 'Voiceless velar plosive' },
          { symbol: 'g', example: 'gato', ipa: 'g', audio: 'gato.mp3', description: 'Voiced velar plosive' },
          { symbol: 'tʃ', example: 'chico', ipa: 'tʃ', audio: 'chico.mp3', description: 'Voiceless postalveolar affricate' },
          null,
          { symbol: 'ɲ', example: 'niño', ipa: 'ɲ', audio: 'niño.mp3', description: 'Palatal nasal' }
        ]
      ],
      vowels: [
        [
          { symbol: 'i', example: 'si', ipa: 'i', audio: 'si.mp3', description: 'Close front unrounded vowel' },
          null,
          { symbol: 'u', example: 'tu', ipa: 'u', audio: 'tu.mp3', description: 'Close back rounded vowel' }
        ],
        [
          { symbol: 'e', example: 'mesa', ipa: 'e', audio: 'mesa.mp3', description: 'Mid front unrounded vowel' },
          null,
          { symbol: 'o', example: 'sol', ipa: 'o', audio: 'sol.mp3', description: 'Mid back rounded vowel' }
        ],
        [
          null,
          { symbol: 'a', example: 'casa', ipa: 'a', audio: 'casa.mp3', description: 'Open front unrounded vowel' },
          null
        ]
      ]
    },
    french: {
      consonants: [
        [
          { symbol: 'p', example: 'pont', ipa: 'p', audio: 'pont.mp3', description: 'Voiceless bilabial plosive' },
          { symbol: 'b', example: 'bon', ipa: 'b', audio: 'bon.mp3', description: 'Voiced bilabial plosive' },
          { symbol: 'f', example: 'feu', ipa: 'f', audio: 'feu.mp3', description: 'Voiceless labiodental fricative' },
          { symbol: 'v', example: 'vous', ipa: 'v', audio: 'vous.mp3', description: 'Voiced labiodental fricative' },
          { symbol: 'm', example: 'main', ipa: 'm', audio: 'main.mp3', description: 'Bilabial nasal' }
        ],
        [
          { symbol: 't', example: 'ton', ipa: 't', audio: 'ton.mp3', description: 'Voiceless dental plosive' },
          { symbol: 'd', example: 'dans', ipa: 'd', audio: 'dans.mp3', description: 'Voiced dental plosive' },
          { symbol: 's', example: 'son', ipa: 's', audio: 'son.mp3', description: 'Voiceless alveolar fricative' },
          { symbol: 'z', example: 'zone', ipa: 'z', audio: 'zone.mp3', description: 'Voiced alveolar fricative' },
          { symbol: 'n', example: 'non', ipa: 'n', audio: 'non.mp3', description: 'Alveolar nasal' }
        ]
      ],
      vowels: [
        [
          { symbol: 'i', example: 'si', ipa: 'i', audio: 'si.mp3', description: 'Close front unrounded vowel' },
          { symbol: 'y', example: 'tu', ipa: 'y', audio: 'tu.mp3', description: 'Close front rounded vowel' },
          { symbol: 'u', example: 'vous', ipa: 'u', audio: 'vous.mp3', description: 'Close back rounded vowel' }
        ],
        [
          { symbol: 'e', example: 'été', ipa: 'e', audio: 'été.mp3', description: 'Close-mid front unrounded vowel' },
          { symbol: 'ø', example: 'peu', ipa: 'ø', audio: 'peu.mp3', description: 'Close-mid front rounded vowel' },
          { symbol: 'o', example: 'mot', ipa: 'o', audio: 'mot.mp3', description: 'Close-mid back rounded vowel' }
        ],
        [
          { symbol: 'ɛ', example: 'lait', ipa: 'ɛ', audio: 'lait.mp3', description: 'Open-mid front unrounded vowel' },
          { symbol: 'œ', example: 'œuf', ipa: 'œ', audio: 'œuf.mp3', description: 'Open-mid front rounded vowel' },
          { symbol: 'ɔ', example: 'fort', ipa: 'ɔ', audio: 'fort.mp3', description: 'Open-mid back rounded vowel' }
        ],
        [
          null,
          { symbol: 'a', example: 'place', ipa: 'a', audio: 'place.mp3', description: 'Open front unrounded vowel' },
          { symbol: 'ɑ', example: 'pâte', ipa: 'ɑ', audio: 'pate.mp3', description: 'Open back unrounded vowel' }
        ]
      ]
    },
    // I'm including a shortened version for brevity, your component would include all languages
    // Other languages would be included here
  };
  
  // New phonetic data by language - this shows allophones and contextual variations
  const phoneticData = {
    english: {
      consonants: [
        [
          { 
            phoneme: 'p', 
            allophones: [
              { symbol: 'p', environment: '_#', example: 'stop [stɑp]', description: 'Unreleased at word-final position' },
              { symbol: 'pʰ', environment: '#_', example: 'pen [pʰɛn]', description: 'Aspirated at syllable-initial position' }
            ]
          },
          { 
            phoneme: 'b', 
            allophones: [
              { symbol: 'b', environment: 'V_V', example: 'ruber [ɹubəɹ]', description: 'Fully voiced between vowels' },
              { symbol: 'b̥', environment: '_#', example: 'rob [ɹɑb̥]', description: 'Partially devoiced at word-final position' }
            ]
          },
          null,
          null,
          { 
            phoneme: 'm', 
            allophones: [
              { symbol: 'm', environment: 'general', example: 'mom [mɑm]', description: 'Bilabial nasal' },
              { symbol: 'ɱ', environment: '_f,v', example: 'comfort [kʌɱfəɹt]', description: 'Labiodental nasal before f or v' }
            ]
          }
        ],
        [
          { 
            phoneme: 't', 
            allophones: [
              { symbol: 't', environment: '_#', example: 'cat [kæt]', description: 'Unreleased at word-final position' },
              { symbol: 'tʰ', environment: '#_', example: 'top [tʰɑp]', description: 'Aspirated at syllable-initial position' },
              { symbol: 'ɾ', environment: 'V_V', example: 'letter [lɛɾəɹ]', description: 'Flap between vowels (American English)' },
              { symbol: 'ʔ', environment: '_n', example: 'button [bʌʔn̩]', description: 'Glottalized before syllabic n' }
            ]
          },
          { 
            phoneme: 'd', 
            allophones: [
              { symbol: 'd', environment: 'V_V', example: 'ladder [lædəɹ]', description: 'Fully voiced between vowels' },
              { symbol: 'd̥', environment: '_#', example: 'had [hæd̥]', description: 'Partially devoiced at word-final position' },
              { symbol: 'ɾ', environment: 'V_V', example: 'rider [ɹaɪɾəɹ]', description: 'Flap between vowels (American English)' }
            ]
          },
          { 
            phoneme: 's', 
            allophones: [
              { symbol: 's', environment: 'general', example: 'sun [sʌn]', description: 'Voiceless alveolar fricative' },
              { symbol: 'z̥', environment: '_voiced', example: 'dogs [dɒgz̥]', description: 'Partially voiced before voiced consonants' }
            ]
          },
          { 
            phoneme: 'z', 
            allophones: [
              { symbol: 'z', environment: 'V_V', example: 'razor [ɹeɪzəɹ]', description: 'Fully voiced between vowels' },
              { symbol: 'z̥', environment: '_#', example: 'boys [bɔɪz̥]', description: 'Partially devoiced at word-final position' }
            ]
          },
          { 
            phoneme: 'n', 
            allophones: [
              { symbol: 'n', environment: 'general', example: 'no [noʊ]', description: 'Alveolar nasal' },
              { symbol: 'ɱ', environment: '_f,v', example: 'info [ɪɱfoʊ]', description: 'Labiodental before f or v' },
              { symbol: 'n̪', environment: '_θ,ð', example: 'tenth [tɛn̪θ]', description: 'Dental before θ or ð' },
              { symbol: 'ŋ', environment: '_k,g', example: 'pink [pɪŋk]', description: 'Velar before k or g' }
            ]
          }
        ],
        [
          { 
            phoneme: 'k', 
            allophones: [
              { symbol: 'k', environment: '_#', example: 'back [bæk]', description: 'Unreleased at word-final position' },
              { symbol: 'kʰ', environment: '#_', example: 'cat [kʰæt]', description: 'Aspirated at syllable-initial position' },
              { symbol: 'k̟', environment: '_i,e', example: 'key [k̟iː]', description: 'Fronted before front vowels' }
            ]
          },
          { 
            phoneme: 'g', 
            allophones: [
              { symbol: 'g', environment: 'V_V', example: 'bigger [bɪgəɹ]', description: 'Fully voiced between vowels' },
              { symbol: 'g̥', environment: '_#', example: 'dog [dɒg̥]', description: 'Partially devoiced at word-final position' },
              { symbol: 'g̟', environment: '_i,e', example: 'geese [g̟iːs]', description: 'Fronted before front vowels' }
            ]
          },
          { 
            phoneme: 'ʃ', 
            allophones: [
              { symbol: 'ʃ', environment: 'general', example: 'ship [ʃɪp]', description: 'Voiceless postalveolar fricative' },
              { symbol: 'ʃʲ', environment: '_i', example: 'sheet [ʃʲiːt]', description: 'Slightly palatalized before i' }
            ]
          },
          { 
            phoneme: 'ʒ', 
            allophones: [
              { symbol: 'ʒ', environment: 'V_V', example: 'measure [mɛʒəɹ]', description: 'Voiced postalveolar fricative' },
              { symbol: 'ʒ̥', environment: '_#', example: 'beige [beɪʒ̥]', description: 'Partially devoiced at word-final position' }
            ]
          },
          { 
            phoneme: 'ŋ', 
            allophones: [
              { symbol: 'ŋ', environment: 'general', example: 'sing [sɪŋ]', description: 'Velar nasal' },
              { symbol: 'ŋ̟', environment: '_i,e', example: 'sinking [sɪŋ̟kɪŋ]', description: 'Fronted before front vowels' }
            ]
          }
        ]
      ],
      vowels: [
        [
          { 
            phoneme: 'i:', 
            allophones: [
              { symbol: 'i:', environment: 'general', example: 'see [si:]', description: 'Long close front unrounded vowel' },
              { symbol: 'ɪi', environment: 'before voiceless', example: 'seat [sɪit]', description: 'Slightly diphthongized' }
            ]
          },
          null,
          { 
            phoneme: 'u:', 
            allophones: [
              { symbol: 'u:', environment: 'general', example: 'blue [blu:]', description: 'Long close back rounded vowel' },
              { symbol: 'ʊu', environment: 'before voiceless', example: 'boot [bʊut]', description: 'Slightly diphthongized' },
              { symbol: 'ü', environment: 'after y/j', example: 'yew [jü]', description: 'Fronted after palatal' }
            ]
          }
        ],
        [
          { 
            phoneme: 'ɪ', 
            allophones: [
              { symbol: 'ɪ', environment: 'general', example: 'bit [bɪt]', description: 'Near-close near-front unrounded vowel' },
              { symbol: 'ɪ̈', environment: 'unstressed', example: 'cities [sɪtɪ̈z]', description: 'Centralized in unstressed syllables' }
            ]
          },
          { 
            phoneme: 'ə', 
            allophones: [
              { symbol: 'ə', environment: 'general', example: 'about [əbaʊt]', description: 'Mid central vowel' },
              { symbol: 'ɨ', environment: 'before /ŋ/', example: 'button [bʌtɨn]', description: 'Raised word-finally or before /ŋ/' }
            ]
          },
          { 
            phoneme: 'ʊ', 
            allophones: [
              { symbol: 'ʊ', environment: 'general', example: 'put [pʊt]', description: 'Near-close near-back rounded vowel' },
              { symbol: 'ʊ̈', environment: 'final unstressed', example: 'into [ɪntʊ̈]', description: 'Centralized in unstressed syllables' }
            ]
          }
        ],
        [
          { 
            phoneme: 'e', 
            allophones: [
              { symbol: 'e', environment: 'general', example: 'bed [bed]', description: 'Open-mid front unrounded vowel' },
              { symbol: 'eɪ', environment: 'before voiced', example: 'beg [beɪg]', description: 'Slightly diphthongized before voiced consonants' }
            ]
          },
          { 
            phoneme: 'ʌ', 
            allophones: [
              { symbol: 'ʌ', environment: 'general', example: 'cut [kʌt]', description: 'Open-mid back unrounded vowel' },
              { symbol: 'ə', environment: 'unstressed', example: 'butter [bʌtə]', description: 'Reduced in unstressed syllables' }
            ]
          },
          { 
            phoneme: 'ɔ:', 
            allophones: [
              { symbol: 'ɔ:', environment: 'general', example: 'saw [sɔ:]', description: 'Long open-mid back rounded vowel' },
              { symbol: 'ɔ:ə', environment: 'r-coloring', example: 'more [mɔ:ə]', description: 'Slight schwa off-glide before r' },
              { symbol: 'ɑ', environment: 'cot-caught', example: 'caught [kɑt]', description: 'Merged with /ɑ/ in some dialects' }
            ]
          }
        ],
        [
          { 
            phoneme: 'æ', 
            allophones: [
              { symbol: 'æ', environment: 'general', example: 'cat [kæt]', description: 'Near-open front unrounded vowel' },
              { symbol: 'æ̝', environment: 'before nasal', example: 'man [mæ̝n]', description: 'Raised before nasals in some dialects' },
              { symbol: 'eə', environment: 'tense', example: 'bad [beəd]', description: 'Tensed allophone in some dialects' }
            ]
          },
          null,
          { 
            phoneme: 'ɑ:', 
            allophones: [
              { symbol: 'ɑ:', environment: 'general', example: 'father [fɑ:ðə]', description: 'Long open back unrounded vowel' },
              { symbol: 'ɑ:ə', environment: 'r-coloring', example: 'car [kɑ:ə]', description: 'Slight schwa off-glide before r' }
            ]
          }
        ]
      ]
    },
    spanish: {
      consonants: [
        [
          { 
            phoneme: 'p', 
            allophones: [
              { symbol: 'p', environment: 'general', example: 'padre [ˈpaðɾe]', description: 'Voiceless bilabial plosive, unaspirated' }
            ]
          },
          { 
            phoneme: 'b', 
            allophones: [
              { symbol: 'b', environment: '#_, after m', example: 'bien [ˈbjen], hombre [ˈombɾe]', description: 'Voiced bilabial plosive, word-initial or after nasal' },
              { symbol: 'β', environment: 'V_V, _C', example: 'había [aˈβia], abrir [aˈβɾiɾ]', description: 'Voiced bilabial fricative between vowels or before consonant' }
            ]
          },
          null,
          null,
          { 
            phoneme: 'm', 
            allophones: [
              { symbol: 'm', environment: 'general', example: 'madre [ˈmaðɾe]', description: 'Bilabial nasal' },
              { symbol: 'ɱ', environment: '_f', example: 'anfibio [aɱˈfiβjo]', description: 'Labiodental nasal before f' }
            ]
          }
        ],
        [
          { 
            phoneme: 't', 
            allophones: [
              { symbol: 't', environment: 'general', example: 'toro [ˈtoɾo]', description: 'Voiceless dental plosive, unaspirated' }
            ]
          },
          { 
            phoneme: 'd', 
            allophones: [
              { symbol: 'd', environment: '#_, after n,l', example: 'donde [ˈdonde], anda [ˈanda]', description: 'Voiced dental plosive, word-initial or after nasal/lateral' },
              { symbol: 'ð', environment: 'V_V, _C', example: 'nada [ˈnaða], madre [ˈmaðɾe]', description: 'Voiced dental fricative between vowels or before consonant' }
            ]
          },
          { 
            phoneme: 's', 
            allophones: [
              { symbol: 's', environment: 'general', example: 'silla [ˈsiʝa]', description: 'Voiceless alveolar fricative' },
              { symbol: 'z', environment: '_ voiced C', example: 'mismo [ˈmizmo]', description: 'Voiced before voiced consonants' },
              { symbol: 'h', environment: '_ # (in some dialects)', example: 'más [mah]', description: 'Aspirated in final position in some dialects' }
            ]
          },
          null,
          { 
            phoneme: 'n', 
            allophones: [
              { symbol: 'n', environment: 'general', example: 'noche [ˈnotʃe]', description: 'Alveolar nasal' },
              { symbol: 'm', environment: '_p,b', example: 'un paso [um ˈpaso]', description: 'Bilabial before p or b' },
              { symbol: 'ɱ', environment: '_f', example: 'enfermo [eɱˈfeɾmo]', description: 'Labiodental before f' },
              { symbol: 'ŋ', environment: '_k,g', example: 'banco [ˈbaŋko]', description: 'Velar before k or g' }
            ]
          }
        ],
        [
          { 
            phoneme: 'k', 
            allophones: [
              { symbol: 'k', environment: 'general', example: 'casa [ˈkasa]', description: 'Voiceless velar plosive, unaspirated' }
            ]
          },
          { 
            phoneme: 'g', 
            allophones: [
              { symbol: 'g', environment: '#_, after n', example: 'gato [ˈgato], mango [ˈmaŋgo]', description: 'Voiced velar plosive, word-initial or after nasal' },
              { symbol: 'ɣ', environment: 'V_V, _C', example: 'lago [ˈlaɣo], grande [ˈɣɾande]', description: 'Voiced velar fricative between vowels or before consonant' }
            ]
          },
          { 
            phoneme: 'tʃ', 
            allophones: [
              { symbol: 'tʃ', environment: 'general', example: 'chico [ˈtʃiko]', description: 'Voiceless postalveolar affricate' },
              { symbol: 'ʃ', environment: 'in some dialects', example: 'chico [ˈʃiko]', description: 'Voiceless postalveolar fricative in some dialects' }
            ]
          },
          null,
          { 
            phoneme: 'ɲ', 
            allophones: [
              { symbol: 'ɲ', environment: 'general', example: 'niño [ˈniɲo]', description: 'Palatal nasal' }
            ]
          }
        ]
      ],
      vowels: [
        [
          { 
            phoneme: 'i', 
            allophones: [
              { symbol: 'i', environment: 'stressed', example: 'piso [ˈpiso]', description: 'Close front unrounded vowel' },
              { symbol: 'ɪ', environment: 'unstressed', example: 'militar [miliˈtaɾ]', description: 'Slightly lowered in unstressed syllables' },
              { symbol: 'j', environment: 'before vowel', example: 'viaje [ˈbjaxe]', description: 'Semivocalic before another vowel' }
            ]
          },
          null,
          { 
            phoneme: 'u', 
            allophones: [
              { symbol: 'u', environment: 'stressed', example: 'muro [ˈmuɾo]', description: 'Close back rounded vowel' },
              { symbol: 'ʊ', environment: 'unstressed', example: 'cultural [kultuˈɾal]', description: 'Slightly lowered in unstressed syllables' },
              { symbol: 'w', environment: 'before vowel', example: 'fuego [ˈfweɣo]', description: 'Semivocalic before another vowel' }
            ]
          }
        ],
        [
          { 
            phoneme: 'e', 
            allophones: [
              { symbol: 'e', environment: 'general', example: 'mesa [ˈmesa]', description: 'Mid front unrounded vowel' },
              { symbol: 'ɛ', environment: 'before r, j', example: 'perro [ˈpɛro]', description: 'More open before r, or j' },
              { symbol: 'e̞', environment: 'unstressed', example: 'mente [ˈmente̞]', description: 'Lowered in unstressed syllables' }
            ]
          },
          null,
          { 
            phoneme: 'o', 
            allophones: [
              { symbol: 'o', environment: 'general', example: 'cosa [ˈkosa]', description: 'Mid back rounded vowel' },
              { symbol: 'ɔ', environment: 'before r, l', example: 'torre [ˈtɔre]', description: 'More open before r or l' },
              { symbol: 'o̞', environment: 'unstressed', example: 'momento [moˈmento̞]', description: 'Lowered in unstressed syllables' }
            ]
          }
        ],
        [
          null,
          { 
            phoneme: 'a', 
            allophones: [
              { symbol: 'a', environment: 'general', example: 'casa [ˈkasa]', description: 'Open central unrounded vowel' },
              { symbol: 'ä', environment: 'unstressed', example: 'caminar [kamiˈnäɾ]', description: 'Centralized in unstressed syllables' }
            ]
          },
          null
        ]
      ]
    },
    french: {
      consonants: [
        [
          { 
            phoneme: 'p', 
            allophones: [
              { symbol: 'p', environment: 'general', example: 'pont [pɔ̃]', description: 'Voiceless bilabial plosive, unaspirated' }
            ]
          },
          { 
            phoneme: 'b', 
            allophones: [
              { symbol: 'b', environment: 'general', example: 'bon [bɔ̃]', description: 'Voiced bilabial plosive' },
              { symbol: 'b̥', environment: '_#', example: 'robe [ʁɔb̥]', description: 'Partially devoiced word-finally' }
            ]
          },
          { 
            phoneme: 'f', 
            allophones: [
              { symbol: 'f', environment: 'general', example: 'feu [fø]', description: 'Voiceless labiodental fricative' }
            ]
          },
          { 
            phoneme: 'v', 
            allophones: [
              { symbol: 'v', environment: 'general', example: 'vous [vu]', description: 'Voiced labiodental fricative' },
              { symbol: 'v̥', environment: '_#', example: 'rêve [ʁɛv̥]', description: 'Partially devoiced word-finally' }
            ]
          },
          { 
            phoneme: 'm', 
            allophones: [
              { symbol: 'm', environment: 'general', example: 'main [mɛ̃]', description: 'Bilabial nasal' }
            ]
          }
        ],
        [
          { 
            phoneme: 't', 
            allophones: [
              { symbol: 't', environment: 'general', example: 'ton [tɔ̃]', description: 'Voiceless dental plosive, unaspirated' }
            ]
          },
          { 
            phoneme: 'd', 
            allophones: [
              { symbol: 'd', environment: 'general', example: 'dans [dɑ̃]', description: 'Voiced dental plosive' },
              { symbol: 'd̥', environment: '_#', example: 'grade [gʁad̥]', description: 'Partially devoiced word-finally' }
            ]
          },
          { 
            phoneme: 's', 
            allophones: [
              { symbol: 's', environment: 'general', example: 'son [sɔ̃]', description: 'Voiceless alveolar fricative' }
            ]
          },
          { 
            phoneme: 'z', 
            allophones: [
              { symbol: 'z', environment: 'general', example: 'zone [zɔn]', description: 'Voiced alveolar fricative' },
              { symbol: 'z̥', environment: '_#', example: 'rose [ʁoz̥]', description: 'Partially devoiced word-finally' }
            ]
          },
          { 
            phoneme: 'n', 
            allophones: [
              { symbol: 'n', environment: 'general', example: 'non [nɔ̃]', description: 'Alveolar nasal' }
            ]
          }
        ]
      ],
      vowels: [
        [
          { 
            phoneme: 'i', 
            allophones: [
              { symbol: 'i', environment: 'general', example: 'si [si]', description: 'Close front unrounded vowel' },
              { symbol: 'ij', environment: 'stressed final', example: 'vie [vij]', description: 'Slightly diphthongized when stressed finally' }
            ]
          },
          { 
            phoneme: 'y', 
            allophones: [
              { symbol: 'y', environment: 'general', example: 'tu [ty]', description: 'Close front rounded vowel' },
              { symbol: 'yɥ', environment: 'stressed final', example: 'rue [ʁyɥ]', description: 'Slightly diphthongized when stressed finally' }
            ]
          },
          { 
            phoneme: 'u', 
            allophones: [
              { symbol: 'u', environment: 'general', example: 'vous [vu]', description: 'Close back rounded vowel' },
              { symbol: 'uw', environment: 'stressed final', example: 'doux [duw]', description: 'Slightly diphthongized when stressed finally' }
            ]
          }
        ],
        [
          { 
            phoneme: 'e', 
            allophones: [
              { symbol: 'e', environment: 'general', example: 'été [ete]', description: 'Close-mid front unrounded vowel' },
              { symbol: 'ej', environment: 'stressed final', example: 'thé [tej]', description: 'Slightly diphthongized when stressed finally' }
            ]
          },
          { 
            phoneme: 'ø', 
            allophones: [
              { symbol: 'ø', environment: 'general', example: 'peu [pø]', description: 'Close-mid front rounded vowel' },
              { symbol: 'øɥ', environment: 'stressed final', example: 'feu [føɥ]', description: 'Slightly diphthongized when stressed finally' }
            ]
          },
          { 
            phoneme: 'o', 
            allophones: [
              { symbol: 'o', environment: 'general', example: 'mot [mo]', description: 'Close-mid back rounded vowel' },
              { symbol: 'ow', environment: 'stressed final', example: 'peau [pow]', description: 'Slightly diphthongized when stressed finally' }
            ]
          }
        ],
        [
          { 
            phoneme: 'ɛ', 
            allophones: [
              { symbol: 'ɛ', environment: 'general', example: 'lait [lɛ]', description: 'Open-mid front unrounded vowel' },
              { symbol: 'ɛj', environment: 'stressed final', example: 'laid [lɛj]', description: 'Slightly diphthongized when stressed finally' },
              { symbol: 'e', environment: 'open syllable', example: 'décès [dese]', description: 'Raised in open syllables in some dialects' }
            ]
          },
          { 
            phoneme: 'œ', 
            allophones: [
              { symbol: 'œ', environment: 'general', example: 'œuf [œf]', description: 'Open-mid front rounded vowel' },
              { symbol: 'ø', environment: 'open syllable', example: 'deux [dø]', description: 'Raised in open syllables' }
            ]
          },
          { 
            phoneme: 'ɔ', 
            allophones: [
              { symbol: 'ɔ', environment: 'general', example: 'fort [fɔʁ]', description: 'Open-mid back rounded vowel' },
              { symbol: 'o', environment: 'open syllable', example: 'rose [ʁoz]', description: 'Raised in open syllables in some dialects' }
            ]
          }
        ],
        [
          null,
          { 
            phoneme: 'a', 
            allophones: [
              { symbol: 'a', environment: 'general', example: 'place [plas]', description: 'Open front unrounded vowel' },
              { symbol: 'ɑ', environment: 'regional', example: 'pâte [pɑt]', description: 'Back variant in some dialects' }
            ]
          },
          { 
            phoneme: 'ɑ', 
            allophones: [
              { symbol: 'ɑ', environment: 'general', example: 'pâte [pɑt]', description: 'Open back unrounded vowel' },
              { symbol: 'a', environment: 'neutral', example: 'pâte [pat]', description: 'Fronted in contemporary French' }
            ]
          }
        ]
      ]
    }
  };
  
  // Handle language change
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setActivePhoneme(null);
  };
  
  // Toggle between phonemic and phonetic view
  const toggleViewMode = () => {
    setViewMode(viewMode === 'phonemic' ? 'phonetic' : 'phonemic');
    setActivePhoneme(null);
  };
  
  // Handle phoneme click in phonemic view
  const handlePhonemeClick = (phoneme) => {
    setActivePhoneme(phoneme);
  };
  
  // Handle allophone click in phonetic view
  const handleAllophoneClick = (phoneme) => {
    setActivePhoneme(phoneme);
  };
  
  // Render a phoneme cell in phonemic view
  const renderPhonemeCell = (phoneme, index) => {
    if (!phoneme) return <td key={index} className="bg-gray-100 w-12 h-12"></td>;
    
    const isActive = activePhoneme && activePhoneme.symbol === phoneme.symbol;
    
    return (
      <td 
        key={index}
        className={`text-center cursor-pointer p-2 w-12 h-12 border ${isActive ? 'bg-blue-200 border-blue-500' : 'hover:bg-blue-100 border-gray-300'}`}
        onClick={() => handlePhonemeClick(phoneme)}
      >
        <div className="text-lg font-semibold">{phoneme.symbol}</div>
      </td>
    );
  };
  
  // Render a phoneme group in phonetic view
  const renderPhoneticCell = (phonemeGroup, index) => {
    if (!phonemeGroup) return <td key={index} className="bg-gray-100 w-24 h-16"></td>;
    
    const isActive = activePhoneme && activePhoneme.phoneme === phonemeGroup.phoneme;
    
    return (
      <td 
        key={index}
        className={`text-center cursor-pointer p-2 w-24 border ${isActive ? 'bg-blue-200 border-blue-500' : 'hover:bg-blue-100 border-gray-300'}`}
        onClick={() => handleAllophoneClick(phonemeGroup)}
      >
        <div className="text-base font-semibold">{phonemeGroup.phoneme}</div>
        <div className="text-xs text-gray-600">
          {phonemeGroup.allophones.slice(0, 2).map((allophone, idx) => (
            <span key={idx} className="inline-block mx-1">[{allophone.symbol}]</span>
          ))}
          {phonemeGroup.allophones.length > 2 && <span>...</span>}
        </div>
      </td>
    );
  };
  
  // Get data for the current language based on view mode
  const getCurrentData = () => {
    if (viewMode === 'phonemic') {
      return phonemeData[selectedLanguage] || { consonants: [], vowels: [] };
    } else {
      // If phonetic data for the selected language doesn't exist, return empty arrays
      // or switch to phonemic view automatically
      if (!phoneticData[selectedLanguage]) {
        console.log(`No phonetic data available for ${selectedLanguage}, displaying phonemic view instead`);
        setViewMode('phonemic');
        return phonemeData[selectedLanguage] || { consonants: [], vowels: [] };
      }
      return phoneticData[selectedLanguage] || { consonants: [], vowels: [] };
    }
  };
  
  const currentData = getCurrentData();
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Interactive Phonology Chart</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="mb-4 md:mb-0">
          <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select a language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="block w-full md:w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <span className={`px-4 py-2 rounded-l-md cursor-pointer ${viewMode === 'phonemic' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setViewMode('phonemic')}>
              Phonemic
            </span>
            <span className={`px-4 py-2 rounded-r-md cursor-pointer ${viewMode === 'phonetic' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setViewMode('phonetic')}>
              Phonetic
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            {viewMode === 'phonemic' ? (
              'Showing abstract sound system'
            ) : (
              'Showing actual sound realizations'
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Consonants</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse border border-gray-300">
            <tbody>
              {currentData.consonants.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {viewMode === 'phonemic' 
                    ? row.map((phoneme, cellIndex) => renderPhonemeCell(phoneme, `cons-${rowIndex}-${cellIndex}`))
                    : row.map((phoneme, cellIndex) => renderPhoneticCell(phoneme, `cons-${rowIndex}-${cellIndex}`))
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vowels</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse border border-gray-300">
            <tbody>
              {currentData.vowels.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {viewMode === 'phonemic'
                    ? row.map((phoneme, cellIndex) => renderPhonemeCell(phoneme, `vowel-${rowIndex}-${cellIndex}`))
                    : row.map((phoneme, cellIndex) => renderPhoneticCell(phoneme, `vowel-${rowIndex}-${cellIndex}`))
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {activePhoneme && viewMode === 'phonemic' && (
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            <span className="text-xl mr-2">{activePhoneme.symbol}</span>
            <span className="text-gray-500">/{activePhoneme.ipa}/</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-semibold">Example:</span> {activePhoneme.example}</p>
              <p><span className="font-semibold">Description:</span> {activePhoneme.description}</p>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <button 
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => console.log(`Playing audio for ${activePhoneme.symbol}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play Pronunciation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activePhoneme && viewMode === 'phonetic' && activePhoneme.allophones && (
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            <span className="text-xl mr-2">/{activePhoneme.phoneme}/</span>
            <span className="text-gray-500">Allophones</span>
          </h3>
          
          <div className="space-y-4">
            {activePhoneme.allophones.map((allophone, index) => (
              <div key={index} className="border-t pt-2 first:border-t-0 first:pt-0">
                <div className="flex flex-col md:flex-row md:items-center mb-2">
                  <div className="flex-1">
                    <span className="text-lg font-medium mr-2">[{allophone.symbol}]</span>
                    <span className="text-sm text-gray-600">Environment: {allophone.environment}</span>
                  </div>
                  <button 
                    className="mt-2 md:mt-0 flex items-center justify-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => console.log(`Playing audio for ${allophone.symbol}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                  </button>
                </div>
                <p><span className="font-semibold">Example:</span> {allophone.example}</p>
                <p><span className="font-semibold">Description:</span> {allophone.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Note: This is a prototype. In a full implementation, the backend would provide complete phonemic and phonetic data for each language and real audio files.</p>
      </div>
    </div>
  );
};

export default CombinedPhonologyChart;