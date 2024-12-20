// Commission calculator and form handling
const commissionCalculator = {
    init() {
      this.setupForm();
      this.setupPriceCalculator();
    },
  
    setupForm() {
      const form = document.createElement('form');
      form.className = 'commission-form';
      form.innerHTML = `
        <h2>Commission Request</h2>
        <div class="form-group">
          <label for="artType">Type of Artwork</label>
          <select id="artType" required>
            <option value="portrait">Digital Portrait</option>
            <option value="illustration">Custom Illustration</option>
            <option value="design">Graphic Design</option>
          </select>
        </div>
        <div class="form-group">
          <label for="size">Size</label>
          <select id="size" required>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Project Description</label>
          <textarea id="description" required></textarea>
        </div>
        <div class="price-estimate">
          Estimated Price: $<span id="estimatedPrice">0</span>
        </div>
        <button type="submit">Submit Commission Request</button>
      `;
  
      document.querySelector('.main-content').appendChild(form);
    },
  
    setupPriceCalculator() {
      const priceChart = {
        portrait: { small: 100, medium: 200, large: 300 },
        illustration: { small: 150, medium: 250, large: 350 },
        design: { small: 80, medium: 160, large: 240 }
      };
  
      const updatePrice = () => {
        const artType = document.getElementById('artType').value;
        const size = document.getElementById('size').value;
        const price = priceChart[artType][size];
        document.getElementById('estimatedPrice').textContent = price;
      };
  
      document.getElementById('artType').addEventListener('change', updatePrice);
      document.getElementById('size').addEventListener('change', updatePrice);
      updatePrice();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => commissionCalculator.init());