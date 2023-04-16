(function () {
  let template = document.createElement("template");
  template.innerHTML = `
      <style>
        :host {}
  
  /* Style for the container */
  div {
    margin: 50px auto;
    max-width: 600px;
  }
  
  /* Style for the input container */
  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Style for the input field */
  #prompt-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 70%;
  }
  
  /* Style for the button */
  #generate-button {
    padding: 10px;
    font-size: 16px;
    background-color: #3399ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 25%;
  }
  
  /* Style for the generated text area */
  #generated-text {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  width:96%;
  }
      </style>
     <div>
      <div class="input-container">
      <input type="text" id="prompt-input" placeholder="Enter a prompt">
      <button id="generate-button">Generate Text</button>
    </div>
    <textarea id="generated-text" rows="10" cols="50" readonly></ textarea>
  </div>
    `;
  class Widget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      const generatedText = this.shadowRoot.getElementById("generated-text");
      generatedText.value = "";
      const {
        apiKey
      } = this._props;
      const {
        endpoint
      } = this._props;
      const generateButton = this.shadowRoot.getElementById("generate-button");
      generateButton.addEventListener("click", async () => {
        const promptInput = this.shadowRoot.getElementById("prompt-input");
        const generatedText = this.shadowRoot.getElementById("generated-text");
        generatedText.value = "Finding result...";
        const prompt = promptInput.value;
        const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/cloud-llm-preview1/locations/us-central1/endpoints/" 
        + endpoint + ":predict";
        // this won't work - needs oauth2
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            "instances": [
              { "content": prompt}
            ],
            "parameters": {
            "temperature": 0.2,
            "maxOutputTokens": 1024,
            "topK": 40,
            "topP": 0.8
            }
          })
        });

        if (response.status === 200) {
          const {
            choices
          } = await response.json();
          const generatedTextValue = choices[0].text;
          generatedText.value = generatedTextValue.replace(/^\n+/, '');
        } else {
          const error = await response.json();
          alert("Response: " + error.error.message);
          generatedText.value = "";
        }
      });
    }
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties
      };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }
  }
  customElements.define("com-kruse-chatwidget", Widget);
})();
