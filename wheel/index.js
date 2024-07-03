/*
 * Copyright (c) 2020. shtrih
 */

const dataSets = {
    inventory: [
        'Просроченный йогурт',
        'Обстрел томатов',
        'Джекпот, Джекпот, ХУЙ ТЕБЕ В РОТ',
        'Голова дай деняг',
        'Jokerge',
        'Расширение территории',
        'Логово сокровищ',
        'World of Warships',
        'Spinel tonic',
        'Дуэль',
        'Много букв, не осилил',
        'Опять',
        'Модеры Кисуми',
        'Мало букв, осилил',
        'Равноценный обмен',
        'Перестрелка кубиками',
        'Еда из помойки',
        'Горячая картошка',
        'Солист группы Грязные жопы',
        'Я ЕБАННЫЙ ЛУДИК',
        'Под пиво сойдет',
        'А ты играл в ...',
        'Воля смертных',
        'Тренировочный ракетомет',
        'Ведро молока',
        'Воля Томатоса',
        'Noikaритка',
        'FirstTimeChatter',
        '322 сценарий',
        'Критический успех',
        'Благословение Логова',
        'Recall',
        'Талисман Удачи',
        'Подкат',
        'Рукоблудие',
        'Элис',
        'Steamhappy',
        'Крепкий сон',
        'Карта нет',
        'Читерские кубики',
        'Одинаковые грани',
        'Сапоги скороходы',
        'Кража',
        'Инверсия',
        'D6',
        'Клавиша shift',
        'Драконье наречие',
        'LastTimeChatter',
        'Срать вечно',
        'Кара',
        'Блять',
        'Пит-стоп',
        'Steamsad',
        'Нихуя',
        '=ХУЙНЯ= Games',
        'Отдача III',
        'Вязкое болото',
        'Передай другому',
        'You shall not pass',
        'Маленькая черная дыра',
        'Клавиша ctrl',
        'Проклятие Потери Времени',
        'Медвежий капкан',
        'Зловещий Прозорливый Взгляд',
        'Картонная стена',
        'Проклятый Путь',
        'Пламенная Ловушка',
        'Туманная банка',
        'Таракан из клавиатуры',
    ],
    effects: [
        'Воля смертных',
        'Тренировочный ракетомет',
        'Ведро молока',
        'Воля Томатоса',
        'Noikaритка',
        'FirstTimeChatter',
        '322 сценарий',
        'Критический успех',
        'Благословение Логова',
        'Recall',
        'Талисман Удачи',
        'Подкат',
        'Рукоблудие',
        'Элис',
        'Steamhappy',
        'Крепкий сон',
        'Карта нет',
        'Читерские кубики',
        'Одинаковые грани',
        'Сапоги скороходы',
        'Кража',
        'Инверсия',
        'D6',
        'Клавиша shift',
    ],
    coin: [
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Ребро!',
    ],
    streamers: [
        'Никита',
        'Максим',
        'Дима',
        'Илья',
        'Егор',
    ],
    debuffs: [
        'Драконье наречие',
        'LastTimeChatter',
        'Срать вечно',
        'Кара',
        'Блять',
        'Пит-стоп',
        'Steamsad',
        'Нихуя',
        '=ХУЙНЯ= Games',
        'Отдача III',
        'Вязкое болото',
        'Передай другому',
        'You shall not pass',
        'Маленькая черная дыра',
        'Клавиша ctrl',
    ]
};
let currentDataSet = 'inventory',
    editedDataSets = {};

const editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    optionClick = function (option, checked) {
        editedDataSets[currentDataSet][option] = checked;
    },
    generateOptions = function (dataObject) {
        let options = '';
        for (let i in dataObject) {
            options += `<label><input type="checkbox" onchange="optionClick('${i}', this.checked)" ${dataObject[i] ? 'checked' : ''} />${i}</label><br />`;
        }

        return options;
    },
    resetEditedDataSet = function () {
        editedDataSets[currentDataSet] = Object.fromEntries(dataSets[currentDataSet].map(v => v).sort().map(v => [v, true]));
    },
    editedDataToArray = function () {
        let result = [];

        for (let [key, value] of Object.entries(editedDataSets[currentDataSet])) {
            if (value) {
                result.push(key)
            }
        }

        return result;
    }
;

editButton.addEventListener('click', function () {
    if (currentDataSet === 'custom') {
        p5Instance.mouseDragEnable(false);
        customDialog.style.display = 'block';

        return;
    }

    editDialog.style.display = 'block';
    p5Instance.mouseDragEnable(false);

    editPresets.innerHTML = '';
    editPresets.append(...presets.getNodes(currentDataSet));
    editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);
});
editConfirmButton.addEventListener('click', function () {
    editDialog.style.display = 'none';
    p5Instance.mouseDragEnable();

    p5Instance.setData(editedDataToArray());
});

class Preset {
    constructor(title, disabledEntries, isDefault) {
        this._title = title;
        this._disabledEntries = disabledEntries;
        this._isDefault = Boolean(isDefault);
    }

    get isDefault() {
        return this._isDefault;
    }

    get domNode() {
        const el = document.createElement('a');

        el.setAttribute('href', '#');
        el.appendChild(document.createTextNode(this._title));
        el.addEventListener('click', this.handleClick.bind(this));

        return el;
    }

    handleClick() {
        resetEditedDataSet();

        for(const i in this._disabledEntries) {
            if (editedDataSets[currentDataSet][this._disabledEntries[i]]) {
                editedDataSets[currentDataSet][this._disabledEntries[i]] = false;
            }
        }

        editOptions.innerHTML = generateOptions(editedDataSets[currentDataSet]);

        return false;
    }
}

class PresetAll extends Preset {
    constructor(isDefault) {
        super('Выбрать всё', [], isDefault);
    }
}

class PresetWithoutSpecialRolls extends Preset {
    constructor(isDefault) {
        super(
            'Без спецроллов',
            [
                'Чуйка на говно',
                'Выбор Бумера',
                'Выбор Зумера',
                'Чат здесь закон',
                'Я здесь закон',
                'Never Lucky',
            ],
            isDefault
        );
    }
}

class Presets {
    constructor() {
        this._presets = {
            // inventory: [
            //     new PresetAll(),
            // ],
            effects: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            debuffs: [
                new PresetAll(),
                new PresetWithoutSpecialRolls(true),
            ],
            streamers: [
                new PresetAll(),
            ],
        };
    }

    hasPreset(dataSetKey) {
        return !!this._presets[dataSetKey];
    }

    getNodes(dataSetKey) {
        let result = [];

        for(const i in this._presets[dataSetKey]) {
            if (i % 2) {
                result.push(document.createTextNode(', '));
            }
            result.push(this._presets[dataSetKey][i].domNode);
        }

        return result;
    }

    applyDefaults(dataSetKey) {
        for(const i in this._presets[dataSetKey]) {
            if (this._presets[dataSetKey][i].isDefault) {
                this._presets[dataSetKey][i].handleClick();
            }
        }
    }
}

const presets = new Presets;

function getImageURI(index) {
    let result = '../hpg-inventory/images/000.png',
        offset = 0
    ;
    switch (currentDataSet) {
        case "inventory":
            result = '../hpg-inventory/images/'+ dataSets[currentDataSet][index] +'.png';
            break;
        case "effects":
            result = '../hpg-inventory/images/'+ dataSets[currentDataSet][index] +'.png';
            break;

        case "debuffs":
            result = '../hpg-inventory/images/'+ dataSets[currentDataSet][index] +'.png';
            break;

        case "coin":
            result = '../images/coin-obverse-20.png';
            if (index === 1) {
                result = '../images/coin-reverse-20.png';
            }
            if (index === 10) {
                result = '../images/coin-gurt.png';
            }
            break;

        case "streamers":
            result = '../images/streamers/'+ dataSets[currentDataSet][index] +'.png';
            break;
    }

    return result;
}

const p5Instance = new p5(wheelSketch);

p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
        // 'videos/14278244937910.webm',
        'videos/ivango_upal.mp4',
        'videos/krispus_car.mp4',
        'videos/skyfai_cum.mp4',
        'videos/skyfai_koncha.mp4',
        'videos/aycelia_reklama.mp4',
        'videos/wei_aa.mp4',
        'videos/wei_vstal.mp4',
        'videos/aycelia_cs.mp4',
        'videos/wei_hi.mp4',
        'videos/kid-hitmanclub.mp4',
        'videos/europapa_only_pa.mp4',
        'videos/giovanni.mp4',
        'videos/ching.mp4',
        'videos/absolute.mp4',
    ]);
};

const image = document.querySelector('#item-image img');
p5Instance.onSelectItem = function(data, selectedKey) {
    if (dataSets[currentDataSet]) {
        image.src = getImageURI(dataSets[currentDataSet].indexOf(data[selectedKey]));
    }
    else {
        image.src = '../hpg-inventory/images/000.png';
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
    p5Instance.mouseDragEnable();
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        currentDataSet = this.value;

        if (this.value === 'custom') {
            p5Instance.mouseDragEnable(false);
            customDialog.style.display = 'block';

            return;
        }

        customDialog.style.display = 'none';
        p5Instance.mouseDragEnable();

        if (presets.hasPreset(currentDataSet)) {
            if (!editedDataSets[currentDataSet]) {
                resetEditedDataSet();
                presets.applyDefaults(currentDataSet);
            }

            p5Instance.setData(editedDataToArray());
            editButton.removeAttribute('disabled');
        }
        else {
            p5Instance.setData(dataSets[currentDataSet]);
            editButton.setAttribute('disabled', 'disabled');
        }
    });

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}
