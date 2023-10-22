import * as PIXI from 'pixi.js';

import { createCharacter, movement } from './game/character';
import { createDirectionTexture } from './game/character/utils';
import manifest from './manifest.json';

export const app = new PIXI.Application({background: '#1099bb', resizeTo: window});

document.body.appendChild(app.view as HTMLCanvasElement);

const load = async () =>
{
    await PIXI.Assets.init({ manifest });
    PIXI.Assets.loadBundle('default');
};

const init = async () =>
{
    load();

    const key: {[key: string]: boolean} = {KeyD: false, KeyA: false, KeyS: false, KeyW: false};

    const data = await PIXI.Assets.loadBundle('default');
    const skeletonSprite = data['img/skeleton/skeleton.json'];
    const skeletonImg = data['img/skeleton/skeleton.png'];

    const {character, characterSheet} = createCharacter(skeletonImg, skeletonSprite);

    

    function logEvent(event: KeyboardEvent)
    {
        key[event.code] = true;
    }
    function unlogEvent(event: KeyboardEvent)
    {
        character.gotoAndStop(0);

        key[event.code] = false;
    }

    window.addEventListener('keydown', logEvent);
    window.addEventListener('keyup', unlogEvent);

    app.stage.addChild(character);
    app.ticker.add(() => movement(key, character, characterSheet));
};

init();