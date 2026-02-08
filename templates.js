/**
 * Resume Templates - Render Functions
 * Each template is a function that takes data and returns HTML string
 */

const TEMPLATES = {

    /**
     * Professional Template - Blue sidebar with white main content
     */
    professional: (data) => {
        return `
      <div class="template-professional">
        <!-- Header -->
        <header class="resume-header">
          <div class="header-info">
            <h1 class="resume-name">${data.fullName || 'Your Name'}</h1>
            <p class="resume-title">${data.title || 'Professional Title'}</p>
            <div class="resume-contact">
              ${data.email ? `<span class="contact-item"><span class="contact-icon">✉</span> ${data.email}</span>` : ''}
              ${data.phone ? `<span class="contact-item"><span class="contact-icon">📞</span> ${data.phone}</span>` : ''}
              ${data.location ? `<span class="contact-item"><span class="contact-icon">📍</span> ${data.location}</span>` : ''}
              ${data.website ? `<span class="contact-item"><span class="contact-icon">🔗</span> ${data.website}</span>` : ''}
            </div>
          </div>
          ${data.photo ? `<img src="${data.photo}" alt="Profile" class="resume-photo">` : ''}
        </header>
        
        <!-- Sidebar -->
        <aside class="resume-sidebar">
          ${renderSkillsSection(data.skills)}
          ${renderLanguagesSection(data.languages)}
          ${renderCertificationsSection(data.certifications)}
        </aside>
        
        <!-- Main Content -->
        <main class="resume-main">
          ${renderSummarySection(data.summary)}
          ${renderExperienceSection(data.experience)}
          ${renderEducationSection(data.education)}
        </main>
      </div>
    `;
    },

    /**
     * Minimal Template - Clean gray sidebar
     */
    minimal: (data) => {
        return `
      <div class="template-minimal">
        <!-- Header -->
        <header class="resume-header">
          <div class="header-info">
            <h1 class="resume-name">${data.fullName || 'Your Name'}</h1>
            <p class="resume-title">${data.title || 'Professional Title'}</p>
            <div class="resume-contact">
              ${data.email ? `<span class="contact-item">${data.email}</span>` : ''}
              ${data.phone ? `<span class="contact-item">${data.phone}</span>` : ''}
              ${data.location ? `<span class="contact-item">${data.location}</span>` : ''}
              ${data.website ? `<span class="contact-item">${data.website}</span>` : ''}
            </div>
          </div>
          ${data.photo ? `<img src="${data.photo}" alt="Profile" class="resume-photo">` : ''}
        </header>
        
        <!-- Sidebar -->
        <aside class="resume-sidebar">
          ${renderSkillsSection(data.skills)}
          ${renderLanguagesSection(data.languages)}
          ${renderCertificationsSection(data.certifications)}
        </aside>
        
        <!-- Main Content -->
        <main class="resume-main">
          ${renderSummarySection(data.summary)}
          ${renderExperienceSection(data.experience)}
          ${renderEducationSection(data.education)}
        </main>
      </div>
    `;
    },

    /**
     * Modern Template - Teal accent
     */
    modern: (data) => {
        return `
      <div class="template-modern">
        <!-- Header -->
        <header class="resume-header">
          <div class="header-info">
            <h1 class="resume-name">${data.fullName || 'Your Name'}</h1>
            <p class="resume-title">${data.title || 'Professional Title'}</p>
            <div class="resume-contact">
              ${data.email ? `<span class="contact-item"><span class="contact-icon">✉</span> ${data.email}</span>` : ''}
              ${data.phone ? `<span class="contact-item"><span class="contact-icon">📞</span> ${data.phone}</span>` : ''}
              ${data.location ? `<span class="contact-item"><span class="contact-icon">📍</span> ${data.location}</span>` : ''}
              ${data.website ? `<span class="contact-item"><span class="contact-icon">🔗</span> ${data.website}</span>` : ''}
            </div>
          </div>
          ${data.photo ? `<img src="${data.photo}" alt="Profile" class="resume-photo">` : ''}
        </header>
        
        <!-- Sidebar -->
        <aside class="resume-sidebar">
          ${renderSkillsSection(data.skills)}
          ${renderLanguagesSection(data.languages)}
          ${renderCertificationsSection(data.certifications)}
        </aside>
        
        <!-- Main Content -->
        <main class="resume-main">
          ${renderSummarySection(data.summary)}
          ${renderExperienceSection(data.experience)}
          ${renderEducationSection(data.education)}
        </main>
      </div>
    `;
    }
};

/* ==================== SECTION RENDERERS ==================== */

function renderSummarySection(summary) {
    if (!summary) return '';
    return `
    <section class="section">
      <h2 class="section-heading">Professional Summary</h2>
      <p class="summary-text">${summary}</p>
    </section>
  `;
}

function renderSkillsSection(skills) {
    if (!skills) return '';
    const skillArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillArray.length === 0) return '';

    return `
    <section class="section">
      <h2 class="section-heading">Skills</h2>
      <div class="skills-list">
        ${skillArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </section>
  `;
}

function renderLanguagesSection(languages) {
    if (!languages) return '';
    return `
    <section class="section">
      <h2 class="section-heading">Languages</h2>
      <div class="simple-list">${languages.replace(/,/g, '<br>')}</div>
    </section>
  `;
}

function renderCertificationsSection(certifications) {
    if (!certifications) return '';
    return `
    <section class="section">
      <h2 class="section-heading">Certifications</h2>
      <div class="simple-list">${certifications.replace(/,/g, '<br>')}</div>
    </section>
  `;
}

function renderExperienceSection(experience) {
    if (!experience || experience.length === 0) return '';

    return `
    <section class="section">
      <h2 class="section-heading">Experience</h2>
      ${experience.map(exp => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${exp.position || 'Position'}</span>
            <span class="item-date">${exp.dates || ''}</span>
          </div>
          <p class="item-subtitle">${exp.company || 'Company'}</p>
          ${exp.description ? `<p class="item-description">${exp.description}</p>` : ''}
        </div>
      `).join('')}
    </section>
  `;
}

function renderEducationSection(education) {
    if (!education || education.length === 0) return '';

    return `
    <section class="section">
      <h2 class="section-heading">Education</h2>
      ${education.map(edu => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${edu.degree || 'Degree'}</span>
            <span class="item-date">${edu.year || ''}</span>
          </div>
          <p class="item-subtitle">${edu.school || 'School'}</p>
          ${edu.details ? `<p class="item-description">${edu.details}</p>` : ''}
        </div>
      `).join('')}
    </section>
  `;
}

/**
 * Main Render Function
 * Called from script.js to render selected template
 */
function renderResume(templateName, data) {
    const templateFn = TEMPLATES[templateName] || TEMPLATES.professional;
    return templateFn(data);
}
