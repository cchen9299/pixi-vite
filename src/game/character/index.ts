import * as PIXI from 'pixi.js';

import { app } from '../../main';
import { AnimationFrames, createDirectionTexture } from './utils';

export interface CustomSpritesheet {
    data: {
        frames: AnimationFrames
        animations: {
            [key: string]: string[]
        }
    }
}

export function createCharacter(texture: PIXI.Texture, spriteSheet: CustomSpritesheet)
{
    const {data:{frames, animations:{skeleton}}} = spriteSheet;
    const characterSheet = createDirectionTexture({
        frames,
        baseSheet: texture.baseTexture,
        animation: skeleton,
        numOfFrame: 9,
        directionOrder: ['up', 'left', 'down', 'right'],
    });
    
    const character = PIXI.AnimatedSprite.fromFrames([skeleton[18]]);
        
    character.anchor.x = 0.5;
    character.anchor.y = 0.5;

    character.x = app.renderer.width / 2;
    character.y = app.renderer.height / 2;

    character.scale.set(2, 2);
    character.loop = false;

    character.animationSpeed = 1 / 6; // 6 fps

    app.stage.addChild(character);

    return {
        character,
        characterSheet,
    };
}

export function movement(
    key: {[key: string]: boolean},
    character: PIXI.AnimatedSprite,
    characterSheet: {[key: string]: PIXI.Texture[]},
)
{
    if (key.KeyD && character.x < app.renderer.width)
    {
        if(!character.playing)
        {
            character.textures = characterSheet.right;
            character.play();
        }
        character.x += 1;
    }
    if (key.KeyA && character.x > 0)
    {
        if(!character.playing)
        {
            character.textures = characterSheet.left;
            character.play();
        }
        character.x -= 1;
    }
    if (key.KeyS && character.y < app.renderer.height)
    {
        if(!character.playing)
        {
            character.textures = characterSheet.down;
            character.play();
        }
        character.y += 1;
    }
    if (key.KeyW && character.y > 0)
    {
        if(!character.playing)
        {
            character.textures = characterSheet.up;
            character.play();
        }
        character.y -= 1;
    }
}