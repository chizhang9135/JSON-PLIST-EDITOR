// Initialize CodeMirror
const codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('jsonInput'), {
    mode: "application/json",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true
});

codeMirrorEditor.on("change", function(cm, change) {
    displayKeyValuePairs(cm.getValue());
});

function validateJSON() {
    const jsonString = codeMirrorEditor.getValue();
    const message = document.getElementById('message');

    try {
        JSON.parse(jsonString);
        message.textContent = "Valid JSON!";
        message.style.color = "green";
    } catch (error) {
        message.textContent = "Invalid JSON: " + error.message;
        message.style.color = "red";
    }
}

function formatJSON() {
    const jsonString = codeMirrorEditor.getValue();
    const message = document.getElementById('message');

    try {
        const parsed = JSON.parse(jsonString);
        codeMirrorEditor.setValue(JSON.stringify(parsed, null, 4));
        message.textContent = "JSON formatted!";
        message.style.color = "green";
    } catch (error) {
        message.textContent = "Invalid JSON: Cannot format!";
        message.style.color = "red";
    }
}

function displayKeyValuePairs(jsonString, parentDiv = null) {
    const keyValuePairsDiv = parentDiv || document.getElementById('keyValuePairs');
    keyValuePairsDiv.innerHTML = ''; // clear previous key-value pairs

    try {
        const jsonObject = JSON.parse(jsonString);
        renderKeyValuePairs(jsonObject, keyValuePairsDiv);
    } catch (error) {
        // Not valid JSON or a JSON fragment
    }
}

function renderKeyValuePairs(jsonObject, container) {
    for (let key in jsonObject) {
        const keyValueDiv = document.createElement('div');
        keyValueDiv.className = 'keyValue';

        const keyInput = document.createElement('input');
        keyInput.className = 'keyInput';
        keyInput.value = key;
        keyValueDiv.appendChild(keyInput);

        if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
            const expandButton = document.createElement('button');
            expandButton.textContent = '+';
            expandButton.onclick = function() {
                const subContainer = document.createElement('div');
                subContainer.className = 'subItem';
                renderKeyValuePairs(jsonObject[key], subContainer);
                keyValueDiv.appendChild(subContainer);
            };
            keyValueDiv.appendChild(expandButton);
        } else {
            const valueInput = document.createElement('input');
            valueInput.className = 'valueInput';
            valueInput.value = jsonObject[key];
            keyValueDiv.appendChild(valueInput);
        }

        container.appendChild(keyValueDiv);
    }
}

codeMirrorEditor.on("change", function(cm, change) {
    displayKeyValuePairs(cm.getValue());
});
