import * as PIXI from 'pixi.js';

export interface Frame {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface AnimationFrames {
    [key: string]: {
        frame:Frame
    }
}

export interface DirectionTexturePayload {
    frames: AnimationFrames,
    baseSheet: PIXI.BaseTexture,
    animation: string[],
    numOfFrame: number,
    directionOrder: string[],
}

export function customTexture(
    baseSheet: PIXI.BaseTexture,
    { frame }: { frame: Frame },
)
{
    return new PIXI.Texture(baseSheet, new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h));
}

export function createDirectionTexture({
    frames,
    baseSheet,
    animation,
    numOfFrame,
    directionOrder,
}: DirectionTexturePayload)
{
    const obj = directionOrder.reduce((acc, curDir, index)=>
    {
        const animationCopy = [...animation];
        const curTextureNameList = animationCopy.slice(index * numOfFrame, index * numOfFrame + numOfFrame);

        return ({
            ...acc,
            [curDir]: curTextureNameList.map((name)=> customTexture(baseSheet, frames[name]) ),
        });
    }, {});

    return obj;
}