(function () {
  // ========== Basic Styles ==========
  const style = document.createElement("style");
  style.innerHTML = `
    .rise-gui {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 700px;
      height: 640px;
      background: #111;
      border-radius: 12px;
      display: flex;
      font-family: 'Segoe UI', sans-serif;
      color: white;
      z-index: 9999;
      box-shadow: 0 0 20px #000;
      flex-direction: column;
      user-select: none;
    }
    .rise-title {
      font-size: 20px;
      font-weight: bold;
      padding: 10px 15px;
      cursor: move;
    }
    .rise-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .rise-sidebar {
      width: 140px;
      background: #1e1e1e;
      border-radius: 0 0 0 12px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .rise-btn {
      background: #2c2c2c;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      transition: background 0.2s;
    }
    .rise-btn:hover {
      background: #3a3a3a;
    }
    .rise-main {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
    }
    .rise-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .rise-header input {
      width: 60%;
      padding: 6px;
      border: none;
      border-radius: 6px;
      outline: none;
    }
    .rise-header .top-controls button {
      background: #2c2c2c;
      border: none;
      color: white;
      padding: 6px 10px;
      margin-left: 5px;
      cursor: pointer;
      border-radius: 6px;
    }
    .cheat-tile {
      background: #1f1f1f;
      padding: 10px;
      margin: 6px 0;
      border-radius: 6px;
    }
    .cheat-tile button {
      margin-top: 5px;
      background: #444;
      color: white;
      border: none;
      padding: 5px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // ========== GUI ==========
  const gui = document.createElement("div");
  gui.className = "rise-gui";
  gui.id = "riseClientGUI";
  gui.innerHTML = `
    <div class="rise-title" id="dragHandle">Rice Client 6</div>
    <div class="rise-body">
      <div class="rise-sidebar">
        <div class="rise-btn" onclick="renderSection('blooket')">Blooket</div>
        <div class="rise-btn" onclick="renderSection('gimkit')">Gimkit</div>
      </div>
      <div class="rise-main">
        <div class="rise-header">
          <input type="text" placeholder="Search...">
          <div class="top-controls">
            <button onclick="minimizeGUI()">—</button>
            <button onclick="exitGUI()">×</button>
          </div>
        </div>
        <div id="cheatContent"></div>
      </div>
    </div>
  `;
  document.body.appendChild(gui);

  // ========== Draggability ==========
  const drag = document.getElementById("dragHandle");
  let isDown = false, offset = [0, 0];

  drag.addEventListener("mousedown", (e) => {
    isDown = true;
    offset = [gui.offsetLeft - e.clientX, gui.offsetTop - e.clientY];
  });

  document.addEventListener("mouseup", () => isDown = false);

  document.addEventListener("mousemove", (e) => {
    if (isDown) {
      gui.style.left = (e.clientX + offset[0]) + 'px';
      gui.style.top = (e.clientY + offset[1]) + 'px';
    }
  });

  // ========== Section Rendering ==========
  window.renderSection = function (game) {
    const container = document.getElementById("cheatContent");
    container.innerHTML = "";

    if (game === "blooket") {
      container.innerHTML += `
        <div class="cheat-tile">
          <b>Auto Answer</b>
          <p>Automatically answers questions correctly.</p>
          <button onclick="blooketAutoAnswer()">Activate</button>
        </div>
        <div class="cheat-tile">
          <b>Infinite Tokens</b>
          <p>Gives you infinite tokens (visual only).</p>
          <button onclick="blooketInfiniteTokens()">Activate</button>
        </div>
        <div class="cheat-tile">
          <b>Reset All Players' Gold</b>
          <p>Set everyone else's gold to 0 (Gold Quest).</p>
          <button onclick="resetAllGold()">Activate</button>
        </div>
        <div class="cheat-tile">
          <b>Set Gold</b>
          <p>Set your gold amount in Gold Quest mode.</p>
          <button onclick="setGoldAmount()">Set Gold</button>
        </div>
      `;
    }

    if (game === "gimkit") {
      container.innerHTML += `
        <div class="cheat-tile">
          <b>Auto Answer</b>
          <p>Automatically selects the correct answer.</p>
          <button onclick="gimkitAutoAnswer()">Activate</button>
        </div>
        <div class="cheat-tile">
          <b>Speed Hack</b>
          <p>Increases game speed locally.</p>
          <button onclick="gimkitSpeedHack()">Activate</button>
        </div>
      `;
    }
  };

  // ========== Minimize & Exit ==========
  window.minimizeGUI = function () {
    const gui = document.getElementById("riseClientGUI");
    gui.style.display = "none";
  };

  window.exitGUI = function () {
    const gui = document.getElementById("riseClientGUI");
    gui.remove();
  };

  // ========== Keyboard Toggle ==========
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
      const gui = document.getElementById("riseClientGUI");
      gui.style.display = gui.style.display === "none" ? "flex" : "none";
    }
  });

  // ========== Cheat Logic ==========
  window.blooketAutoAnswer = function () {
    alert("[Blooket] Auto Answer Activated (placeholder)");
    // TODO: Inject correct answer logic
  };

  window.blooketInfiniteTokens = function () {
    alert("[Blooket] Infinite Tokens (visual only)");
  };

  window.resetAllGold = function () {
    try {
      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      window.alert = iframe.contentWindow.alert.bind(window);
      iframe.remove();

      const { props, state } = Object.values(document.querySelector("body div[id] > div > div"))[1].children[0]._owner.stateNode;
      let count = 0;

      props.liveGameController.getDatabaseVal("c", async players => {
        if (players) {
          for (let player of Object.keys(players)) {
            props.liveGameController.setVal({
              path: `c/${props.client.name}`,
              val: {
                b: props.client.blook,
                g: state.gold,
                tat: player + ":swap:0"
              }
            });
            count++;
            await new Promise(r => setTimeout(r, 4000));
          }
          alert(`Reset ${count} players' gold!`);
        }
      });
    } catch (e) {
      alert("Failed to reset: " + e.message);
    }
  };

  window.setGoldAmount = function () {
    const input = prompt("Enter the amount of gold you want:");
    const goldAmount = Number(input);

    if (isNaN(goldAmount) || goldAmount < 0) {
      return alert("Please enter a valid number.");
    }

    try {
      const stateNode = Object.values(document.querySelector("body div[id] > div > div"))[1]
        .children[0]._owner.stateNode;

      stateNode.setState({
        gold: goldAmount,
        gold2: goldAmount
      });

      stateNode.props.liveGameController.setVal({
        path: `c/${stateNode.props.client.name}`,
        val: {
          b: stateNode.props.client.blook,
          g: goldAmount
        }
      });

      alert(`Gold set to ${goldAmount}!`);
    } catch (err) {
      alert("Failed to set gold: " + err.message);
    }
  };

  window.gimkitAutoAnswer = function () {
    alert("[Gimkit] Auto Answer Activated (placeholder)");
  };

  window.gimkitSpeedHack = function () {
    alert("[Gimkit] Speed Hack Activated (placeholder)");
  };

  // Default tab
  renderSection('blooket');
})();
