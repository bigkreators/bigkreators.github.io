// Save this as "infobox-templates.js"

// Template system for creating Wiki-style templates
class TemplateSystem {
    constructor() {
        // Store registered templates
        this.templates = {};
        
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    // Register a new template
    registerTemplate(name, renderFunction) {
        this.templates[name] = renderFunction;
    }
    
    // Initialize the system
    initialize() {
        // Find all template calls in the document
        const templateCalls = document.querySelectorAll('template-call');
        
        // Process each template call
        templateCalls.forEach(call => {
            // Get template name and parameters
            const templateName = call.getAttribute('template');
            if (!templateName || !this.templates[templateName]) {
                call.outerHTML = `<div class="template-error">Template "${templateName}" not found</div>`;
                return;
            }
            
            // Extract parameters
            const params = {};
            for (const attr of call.attributes) {
                if (attr.name !== 'template') {
                    params[attr.name] = attr.value;
                }
            }
            
            // Render the template
            try {
                const rendered = this.templates[templateName](params);
                call.outerHTML = rendered;
            } catch (error) {
                call.outerHTML = `<div class="template-error">Error rendering template "${templateName}": ${error.message}</div>`;
            }
        });
    }
}

// Create the global template system
const WikiTemplates = new TemplateSystem();

// Register the IPA Infobox template - matches manual table styling exactly
WikiTemplates.registerTemplate('InfoboxIPA', function(params) {
    // Default values
    const defaults = {
        title: 'IPA Symbol',
        ipasymbol: '',
        topbgcolor: '#f2f2ce',
        mainbgcolor: '#ffffe6',
        imagefile: '',
        imagewidth: '',
        imageheight: '',
        imagestyle: '',
        audiofile: ''
    };
    
    // Merge defaults with provided params
    const p = {...defaults, ...params};
    
    // Build image HTML if provided
    let imageHtml = '';
    if (p.imagefile) {
        let imgAttributes = `src="${p.imagefile}"`;
        
        // Add optional width
        if (p.imagewidth) {
            imgAttributes += ` width="${p.imagewidth}"`;
        }
        
        // Add optional height  
        if (p.imageheight) {
            imgAttributes += ` height="${p.imageheight}"`;
        }
        
        // Add optional custom style
        if (p.imagestyle) {
            imgAttributes += ` style="${p.imagestyle}"`;
        }
        
        imageHtml = `<br><img ${imgAttributes} />`;
    }
    
    // Build audio HTML if provided
    let audioHtml = '';
    if (p.audiofile) {
        audioHtml = `<tr>
            <td>
                <span>
                    <audio src="${p.audiofile}" controls></audio>
                </span>
            </td>
        </tr>`;
    }
    
    // Add clickable-text class and data-audio-url if audio is provided
    let symbolClass = '';
    let audioAttr = '';
    if (p.audiofile) {
        symbolClass = ' class="clickable-text"';
        audioAttr = ` data-audio-url="${p.audiofile}"`;
    }
    
    // Build simple HTML that matches your manual tables exactly
    return `
        <table class="otherones-table">
            <tbody>
                <tr>
                    <th style="background: ${p.topbgcolor};">
                        ${p.title}
                    </th>
                </tr>
                <tr>
                    <td style="background: ${p.mainbgcolor};">
                        <span${symbolClass}${audioAttr} style="font-size: 5em; line-height: 1.2em; vertical-align: super; font-weight: normal;">
                            ${p.ipasymbol}
                        </span>
                        ${imageHtml}
                        ${audioHtml}
                    </td>
                </tr>
            </tbody>
        </table>
    `;
});

// Register the Dual Column IPA Symbol template - also uses otherones-table class
WikiTemplates.registerTemplate('DualIPA', function(params) {
    // Default values
    const defaults = {
        title: 'IPA Symbol',
        symbol1: '',
        symbol2: '',
        topbgcolor: '#f2f2ce',
        mainbgcolor: '#ffffe6'
    };
    
    // Merge defaults with provided params
    const p = {...defaults, ...params};
    
    // Determine if we should use two columns or one
    const hasTwoSymbols = p.symbol2 && p.symbol2.trim() !== '';
    
    // Build HTML that matches manual table styling
    let html = `
        <table class="otherones-table">
            <tbody>
                <tr>
                    <th style="background: ${p.topbgcolor};" colspan="${hasTwoSymbols ? '2' : '1'}">
                        ${p.title}
                    </th>
                </tr>`;
                
    if (hasTwoSymbols) {
        // Two symbol layout with border between cells
        html += `
                <tr>
                    <td style="background: ${p.mainbgcolor}; border-right: 1px solid #ccc; width: 50%;">
                        <span style="font-size: 5em; line-height: 1.2em; vertical-align: super; font-weight: normal;">
                            ${p.symbol1}
                        </span>
                    </td>
                    <td style="background: ${p.mainbgcolor}; width: 50%;">
                        <span style="font-size: 5em; line-height: 1.2em; vertical-align: super; font-weight: normal;">
                            ${p.symbol2}
                        </span>
                    </td>
                </tr>`;
    } else {
        // Single symbol layout
        html += `
                <tr>
                    <td style="background: ${p.mainbgcolor};">
                        <span style="font-size: 5em; line-height: 1.2em; vertical-align: super; font-weight: normal;">
                            ${p.symbol1}
                        </span>
                    </td>
                </tr>`;
    }
    
    html += `
            </tbody>
        </table>
    `;
    
    return html;
});

// Create and append a stylesheet link
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/stylesheet.css';
document.head.appendChild(link);

// You can register more templates here
// Example: WikiTemplates.registerTemplate('AnotherTemplate', function(params) {...});
