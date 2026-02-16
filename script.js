/**
 * Resume Generator Pro - Main Application Logic
 */

const APP = {
  // State
  data: {
    photo: '',
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    skills: '',
    languages: '',
    certifications: '',
    experience: [],
    education: []
  },
  template: 'professional',
  colorScheme: 'blue',
  isDarkMode: false,

  // Initialize
  init() {
    this.loadFromStorage();
    this.bindEvents();
    this.applySettings();
    this.renderPreview();
    console.log('Resume Generator initialized');
  },

  // Bind all events
  bindEvents() {
    // Form inputs
    document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(input => {
      input.addEventListener('input', () => this.handleInputChange(input));
    });

    // Photo upload
    document.getElementById('photoInput').addEventListener('change', (e) => this.handlePhotoUpload(e));

    // Template & Color
    document.getElementById('templateSelect').addEventListener('change', (e) => {
      this.template = e.target.value;
      this.saveToStorage();
      this.renderPreview();
    });

    document.getElementById('colorScheme').addEventListener('change', (e) => {
      this.colorScheme = e.target.value;
      this.applyColorScheme();
      this.saveToStorage();
    });

    // Dark Mode
    document.getElementById('darkModeBtn').addEventListener('click', () => this.toggleDarkMode());

    // Home Button
    document.getElementById('homeBtn').addEventListener('click', () => {
      window.location.reload();
    });

    // Popup buttons
    document.getElementById('servicesBtn').addEventListener('click', () => {
      this.showPopup('Services', '<p class="popup-text">🚀 <strong>Coming Soon!</strong><br><br>We\'re working on exciting new features. Stay tuned!</p>');
    });

    document.getElementById('contactBtn').addEventListener('click', () => {
      window.open('https://www.suhaibsetcodes.in', '_blank');
    });

    document.getElementById('popupClose').addEventListener('click', () => this.hidePopup());
    document.getElementById('popupOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'popupOverlay') this.hidePopup();
    });

    // Experience & Education
    document.getElementById('addExpBtn').addEventListener('click', () => this.addExperience());
    document.getElementById('addEduBtn').addEventListener('click', () => this.addEducation());

    // Action buttons
    document.getElementById('saveBtn').addEventListener('click', () => this.saveToStorage(true));
    document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());
  },

  // Handle input changes
  handleInputChange(input) {
    const field = input.id;
    if (this.data.hasOwnProperty(field)) {
      this.data[field] = input.value;
      this.saveToStorage();
      this.renderPreview();
    }
  },

  // Photo upload
  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.data.photo = event.target.result;
      const preview = document.getElementById('photoPreview');
      preview.src = this.data.photo;
      preview.classList.remove('hidden');
      this.saveToStorage();
      this.renderPreview();
    };
    reader.readAsDataURL(file);
  },

  // Experience management
  addExperience() {
    this.data.experience.push({
      position: '',
      company: '',
      dates: '',
      description: ''
    });
    this.renderExperienceList();
    this.saveToStorage();
  },

  deleteExperience(index) {
    this.data.experience.splice(index, 1);
    this.renderExperienceList();
    this.saveToStorage();
    this.renderPreview();
  },

  renderExperienceList() {
    const list = document.getElementById('experienceList');
    list.innerHTML = this.data.experience.map((exp, i) => `
      <div class="list-item">
        <div class="list-item-header">
          <strong>Experience ${i + 1}</strong>
          <button type="button" class="delete-btn" onclick="APP.deleteExperience(${i})">✕ Delete</button>
        </div>
        <input type="text" class="input" placeholder="Position" value="${exp.position}" 
          onchange="APP.updateExperience(${i}, 'position', this.value)">
        <input type="text" class="input" placeholder="Company" value="${exp.company}"
          onchange="APP.updateExperience(${i}, 'company', this.value)">
        <input type="text" class="input" placeholder="Dates (e.g., 2020 - Present)" value="${exp.dates}"
          onchange="APP.updateExperience(${i}, 'dates', this.value)">
        <textarea class="textarea" placeholder="Description" rows="2"
          onchange="APP.updateExperience(${i}, 'description', this.value)">${exp.description}</textarea>
      </div>
    `).join('');
  },

  updateExperience(index, field, value) {
    this.data.experience[index][field] = value;
    this.saveToStorage();
    this.renderPreview();
  },

  // Education management
  addEducation() {
    this.data.education.push({
      degree: '',
      school: '',
      year: '',
      details: ''
    });
    this.renderEducationList();
    this.saveToStorage();
  },

  deleteEducation(index) {
    this.data.education.splice(index, 1);
    this.renderEducationList();
    this.saveToStorage();
    this.renderPreview();
  },

  renderEducationList() {
    const list = document.getElementById('educationList');
    list.innerHTML = this.data.education.map((edu, i) => `
      <div class="list-item">
        <div class="list-item-header">
          <strong>Education ${i + 1}</strong>
          <button type="button" class="delete-btn" onclick="APP.deleteEducation(${i})">✕ Delete</button>
        </div>
        <input type="text" class="input" placeholder="Degree" value="${edu.degree}"
          onchange="APP.updateEducation(${i}, 'degree', this.value)">
        <input type="text" class="input" placeholder="School/University" value="${edu.school}"
          onchange="APP.updateEducation(${i}, 'school', this.value)">
        <input type="text" class="input" placeholder="Year" value="${edu.year}"
          onchange="APP.updateEducation(${i}, 'year', this.value)">
        <textarea class="textarea" placeholder="Details (GPA, Honors, etc.)" rows="2"
          onchange="APP.updateEducation(${i}, 'details', this.value)">${edu.details}</textarea>
      </div>
    `).join('');
  },

  updateEducation(index, field, value) {
    this.data.education[index][field] = value;
    this.saveToStorage();
    this.renderPreview();
  },

  // Render resume preview
  renderPreview() {
    const container = document.getElementById('resumePreview');
    container.innerHTML = renderResume(this.template, this.data);
    this.autoFitContent();
  },

  // Auto-scale to fit one page
  autoFitContent() {
    const page = document.getElementById('resumePreview');
    const pageHeight = 1122; // A4 height in pixels at 96dpi (297mm)

    // Reset scale first
    page.style.transform = 'scale(1)';
    page.style.transformOrigin = 'top left';

    // Check if content overflows
    const contentHeight = page.scrollHeight;

    if (contentHeight > pageHeight) {
      const scale = (pageHeight / contentHeight) - 0.02; // Small buffer
      const limitedScale = Math.max(scale, 0.5); // Don't go below 50%
      page.style.transform = `scale(${limitedScale})`;
    }
  },

  // Popup methods
  showPopup(title, content) {
    document.getElementById('popupBody').innerHTML = `
      <h3 class="popup-title">${title}</h3>
      ${content}
    `;
    document.getElementById('popupOverlay').classList.remove('hidden');
  },

  hidePopup() {
    document.getElementById('popupOverlay').classList.add('hidden');
  },

  // Dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.getElementById('darkModeBtn').textContent = this.isDarkMode ? '☀️' : '🌙';
    this.saveToStorage();
  },

  // Color scheme
  applyColorScheme() {
    document.body.className = document.body.className.replace(/color-\w+/g, '');
    if (this.colorScheme !== 'blue') {
      document.body.classList.add(`color-${this.colorScheme}`);
    }
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  },

  // Apply all settings
  applySettings() {
    // Template
    document.getElementById('templateSelect').value = this.template;

    // Color
    document.getElementById('colorScheme').value = this.colorScheme;
    this.applyColorScheme();

    // Dark mode
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('darkModeBtn').textContent = '☀️';
    }

    // Populate form fields
    Object.keys(this.data).forEach(key => {
      const input = document.getElementById(key);
      if (input && typeof this.data[key] === 'string') {
        input.value = this.data[key];
      }
    });

    // Photo
    if (this.data.photo) {
      const preview = document.getElementById('photoPreview');
      preview.src = this.data.photo;
      preview.classList.remove('hidden');
    }

    // Experience & Education lists
    this.renderExperienceList();
    this.renderEducationList();
  },

  // Storage
  saveToStorage(showNotification = false) {
    const state = {
      data: this.data,
      template: this.template,
      colorScheme: this.colorScheme,
      isDarkMode: this.isDarkMode
    };
    localStorage.setItem('resumeGeneratorState', JSON.stringify(state));

    if (showNotification) {
      alert('Resume saved successfully!');
    }
  },

  loadFromStorage() {
    const saved = localStorage.getItem('resumeGeneratorState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.data = { ...this.data, ...state.data };
        this.template = state.template || 'professional';
        this.colorScheme = state.colorScheme || 'blue';
        this.isDarkMode = state.isDarkMode !== undefined ? state.isDarkMode : true; // Default to dark
      } catch (e) {
        console.error('Error loading saved state:', e);
      }
    } else {
      // First visit: default to dark mode
      this.isDarkMode = true;
    }
  },

  // PDF Download
  async downloadPDF() {
    const element = document.getElementById('resumePreview');

    // Wait for assets
    await document.fonts.ready;
    const images = Array.from(element.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // PDF options
    const opt = {
      margin: 0,
      filename: `Resume_${this.data.fullName.replace(/\s+/g, '_') || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      alert('PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF error:', err);
      alert('PDF generation failed. Using print fallback.');
      window.print();
    }
  }
};

// Start app
document.addEventListener('DOMContentLoaded', () => APP.init());
