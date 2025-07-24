import { cleanString } from './utils.js';

async function fetchData() {
    const res = await fetch('../data/animeChDB.json');
    return await res.json();
}

function searchCharacter(name, data) {
    const cleanName = cleanString(name);
    return data.filter(entry =>
        cleanString(entry.character.name).includes(cleanName)
    );
}

document.getElementById("searchBtn").onclick = async () => {
    const name = document.getElementById("searchInput").value.trim();
    const data = await fetchData();
    const results = searchCharacter(name, data);

    const container = document.getElementById("results");
    container.innerHTML = "";

    // لا توجد نتائج
    if (results.length === 0) {
        container.innerHTML = `<p style="color:red;">Character not found.</p>`;
        return;
    }

    // أكثر من نتيجة – نعرض قائمة لاختيار واحدة
    if (results.length > 1) {
        const list = document.createElement("ul");
        list.style.listStyle = "none";
        list.style.padding = "0";
        list.style.marginTop = "10px";

        results.forEach((entry, index) => {
            const item = document.createElement("li");
            item.style.cursor = "pointer";
            item.style.padding = "8px";
            item.style.border = "1px solid #ccc";
            item.style.borderRadius = "5px";
            item.style.marginBottom = "5px";
            item.style.background = "#2c2c3c";
            item.style.color = "#fff";

            item.textContent = `${entry.character.name} (${entry.anime.name})`;

            item.onclick = () => {
                container.innerHTML = ""; // تنظيف القائمة

                const { character, anime, relatives } = entry;
                const relativeEntries = Object.entries(relatives || {}).filter(
                    ([key, value]) => value && key !== "error"
                );

                const div = document.createElement("div");
                div.className = "card";
                div.style.position = "relative";

                div.innerHTML = `
                  <div class="character-details">
                    <img src="${character.image}" alt="${character.name}" class="character-image" />

                    <div class="character-info-box">
                      <div class="character-header">
                        ${character.name} <span class="anime-name">(${anime.name})</span>
                      </div>

                      <div class="info-grid">
                        <div class="row"><div class="label">Quote</div><div class="value">"${anime.quote}"</div></div>
                        <div class="row"><div class="label">Age</div><div class="value">${character.age}</div></div>
                        <div class="row"><div class="label">Birth</div><div class="value">${character.birth}</div></div>
                        <div class="row"><div class="label">Gender</div><div class="value">${character.gender}</div></div>
                        <div class="row"><div class="label">Race</div><div class="value">${character.race}</div></div>
                        <div class="row"><div class="label">Status</div><div class="value">${character.status}</div></div>
                        <div class="row"><div class="label">First Appearance</div><div class="value">${character.appearances}</div></div>
                        <div class="row"><div class="label">Married</div><div class="value">${character.married}</div></div>
                        <div class="row"><div class="label">Personality</div><div class="value">${character.personality}</div></div>
                        <div class="row"><div class="label">Role</div><div class="value">${anime.role}</div></div>
                        ${
                          relativeEntries.length
                            ? `<div class="row"><div class="label">Relatives</div><div class="value">${relativeEntries
                                .map(([r, n]) => `${r}: ${n}`)
                                .join("<br>")}</div></div>`
                            : ""
                        }
                        ${
                          relatives?.error
                            ? `<div class="row"><div class="label">Relation Error</div><div class="value" style="color:red;">${relatives.error}</div></div>`
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                `;

                container.appendChild(div);
            };

            list.appendChild(item);
        });

        container.innerHTML = `<p>Multiple characters found. Please select:</p>`;
        container.appendChild(list);
        return;
    }

    // نتيجة واحدة – عرض مباشر
    const entry = results[0];
    const { character, anime, relatives } = entry;
    const relativeEntries = Object.entries(relatives || {}).filter(
        ([key, value]) => value && key !== "error"
    );

    const div = document.createElement("div");
    div.className = "card";
    div.style.position = "relative";

    div.innerHTML = `
      <div class="character-details">
        <img src="${character.image}" alt="${character.name}" class="character-image" />

        <div class="character-info-box">
          <div class="character-header">
            ${character.name} <span class="anime-name">(${anime.name})</span>
          </div>

          <div class="info-grid">
            <div class="row"><div class="label">Quote</div><div class="value">"${anime.quote}"</div></div>
            <div class="row"><div class="label">Age</div><div class="value">${character.age}</div></div>
            <div class="row"><div class="label">Birth</div><div class="value">${character.birth}</div></div>
            <div class="row"><div class="label">Gender</div><div class="value">${character.gender}</div></div>
            <div class="row"><div class="label">Race</div><div class="value">${character.race}</div></div>
            <div class="row"><div class="label">Status</div><div class="value">${character.status}</div></div>
            <div class="row"><div class="label">First Appearance</div><div class="value">${character.appearances}</div></div>
            <div class="row"><div class="label">Married</div><div class="value">${character.married}</div></div>
            <div class="row"><div class="label">Personality</div><div class="value">${character.personality}</div></div>
            <div class="row"><div class="label">Role</div><div class="value">${anime.role}</div></div>
            ${
              relativeEntries.length
                ? `<div class="row"><div class="label">Relatives</div><div class="value">${relativeEntries
                    .map(([r, n]) => `${r}: ${n}`)
                    .join("<br>")}</div></div>`
                : ""
            }
            ${
              relatives?.error
                ? `<div class="row"><div class="label">Relation Error</div><div class="value" style="color:red;">${relatives.error}</div></div>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    container.appendChild(div);
};
