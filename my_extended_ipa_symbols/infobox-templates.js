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

// Register the IPA Infobox template
WikiTemplates.registerTemplate('InfoboxIPA', function(params) {
    // Default values
    const defaults = {
        title: 'IPA Symbol',
        ipasymbol: '',
        audio: '',
        topbgcolor: '#f2f2ce',
        mainbgcolor: '#ffffe6'
    };
    
    // Merge defaults with provided params
    const p = {...defaults, ...params};
    
    // Generate image HTML if provided
    let imageHtml = '';
    if (p.imagefile) {
        const size = p.imagesize || '150px';
        imageHtml = `<img src="${p.imagefile}" alt="IPA symbol ${p.ipasymbol}" style="width: ${size};">`;
    }
    
    // Create rows HTML for all provided parameters
    const createRow = (label, value) => {
        if (!value) return ''; // Skip empty values
        return `
            <tr>
                <th style="width: 40%; text-align: right; padding-right: 10px;">${label}:</th>
                <td style="padding-left: 10px;">${value}</td>
            </tr>
        `;
    };
    
    // Build rows
    const rows = [
        createRow('IPA number', p.ipanumber),
        createRow('Decimal', p.decimal),
        createRow('X-SAMPA', p.xsampa),
        createRow('Braille', p.braille),
        createRow('Braille (alt)', p.braille2)
    ].filter(row => row !== '').join('');
    
    // Build full HTML
    return `
        <table style="width: 30%; margin-bottom: 20px; box-sizing: border-box;" class="infobox-ipa">
            <tbody>
                <tr>
                    <th colspan="2" style="background: ${p.topbgcolor};">
                        ${p.title}
                    </th>
                </tr>
                <tr>
                    <th class="infobox-header" colspan="2" style="background: ${p.mainbgcolor}; text-align: center;">
                        <span style="font-size: 5em; line-height: 1.2em; font-weight: normal;">
                            <span class="IPA nowrap">
                                ${p.ipasymbol}
                            </span>
                        </span>
                        ${imageHtml ? `<div style="margin-top: 10px;">${imageHtml}</div>` : ''}
                    </th>
                </tr>
                ${rows}
            </tbody>
        </table>
    `;
});

// You can register more templates here
// Example: WikiTemplates.registerTemplate('AnotherTemplate', function(params) {...});
