// Download Extension Function
function downloadExtension() {
  // For GitHub Pages: direct download of the ZIP file
  // For local/backend: use Flask route
  const isGitHubPages = window.location.hostname.includes('github.io');
  const downloadUrl = isGitHubPages 
    ? 'ecotrace-extension.zip'  // Direct file on GitHub Pages
    : '/download/extension';     // Flask route for local hosting
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'ecotrace-extension.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show installation instructions after download starts
  setTimeout(() => {
    showInstallInstructions();
  }, 500);
}

function showInstallInstructions() {
  // Create installation instructions modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 1rem; max-width: 600px; margin: 1rem;">
      <h2 style="color: #10b981; margin-bottom: 1rem;">
        <i class="fas fa-check-circle"></i> Extension Downloaded!
      </h2>
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
        <h3 style="color: #111827; font-size: 1.1rem; margin-bottom: 0.5rem;">Installation Steps:</h3>
        <ol style="color: #6b7280; line-height: 1.8; padding-left: 1.5rem;">
          <li>Extract the downloaded <code style="background: #e5e7eb; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">ecotrace-extension.zip</code> file</li>
          <li>Open Chrome and go to <code style="background: #e5e7eb; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">chrome://extensions/</code></li>
          <li>Enable <strong>Developer mode</strong> (toggle in top-right corner)</li>
          <li>Click <strong>Load unpacked</strong></li>
          <li>Select the extracted <code style="background: #e5e7eb; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">extension</code> folder</li>
          <li>Start shopping and track your carbon footprint!</li>
        </ol>
      </div>
      <div style="background: #dbeafe; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border-left: 4px solid #3b82f6;">
        <p style="color: #1e40af; margin: 0; font-size: 0.9rem;">
          <strong>💡 Tip:</strong> Pin the extension to your toolbar for easy access while shopping!
        </p>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button onclick="window.open('extension/README.md', '_blank')" style="background: #f3f4f6; color: #10b981; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
          View Documentation
        </button>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
          Got it!
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
