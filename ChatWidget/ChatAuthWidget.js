(function () {
   let template = document.createElement("template");
   template.innerHTML = `
<br>
<style>
    #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 auto;
    }
    a {
        text-decoration: none;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }
    td {
        padding: 1px;
        text-align: left;
        font-size: 13px;
    }
    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 32px;
	height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
    select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }
    #label {
        width: 140px;
    }
</style>
<form id="form">
    <table>
        <tr>
    <td>
    <p>Api Key</p>
    <input id="builder_apiKey" type="text" placeholder="Enter Api Key">
    </td>
    </tr>
    <tr>
    <td>
    <p>Endpoint</p>
    <input id="builder_endpoint" type="number" placeholder="Enter Endpoint">
    </td>
    </tr>
    
    </table>
    <input value="Update Settings" type="submit">
    <br>
</form>
`;
   class ChatWidgetBuilderPanel extends HTMLElement {
      constructor() {
         super();
         this._shadowRoot = this.attachShadow({
            mode: "open"
         });
         this._shadowRoot.appendChild(template.content.cloneNode(true));
         this._shadowRoot
            .getElementById("form")
            .addEventListener("submit", this._submit.bind(this));
      }
      _submit(e) {
         e.preventDefault();
         this.dispatchEvent(
            new CustomEvent("propertiesChanged", {
               detail: {
                  properties: {
                     apiKey: this.apiKey,
                     endpoint: this.endpoint
                  },
               },
            })
         );
      }

      set apiKey(_apiKey) {
         this._shadowRoot.getElementById("builder_apiKey").value = _apiKey;
      }
      get apiKey() {
         return this._shadowRoot.getElementById("builder_apiKey").value;
      }

      set endpoint(_endpoint) {
         this._shadowRoot.getElementById("builder_endpoint").value = _endpoint;
      }
      get endpoint() {
         return this._shadowRoot.getElementById("builder_endpoint").value;
      }

   }
   customElements.define("com-kruse-chatauthwidget",
      ChatWidgetBuilderPanel
   );
})();
