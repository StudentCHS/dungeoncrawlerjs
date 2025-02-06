/*
*Constants
*/
const TILE_SIZE = 16;

/*
*Globals
*/
// let selectionBox: Sprite = null;
let playerSprite: Sprite = null;
let boySprite: Sprite = null;
// let girlSprite: Sprite = null;
let projectileSprite: Sprite = null;
let enemySprite: Sprite = null;
let enemyList: Sprite[] = [];
let doorSprite: Sprite = null;
let chestSprite: Sprite = null;
let userName = game.askForString("What is your name?");
let intro = "Hello, " + userName + ", you are about to embark on an adventure!";
let loadedLevel = 1;
let maxLevel = 3;

/*
*Classes
*/
class PlayerSprite extends sprites.ExtendableSprite {
    constructor(image: Image, kind: number) {
        super(image, kind);

    }
}

class EnemySprite extends sprites.ExtendableSprite {
    constructor(image: Image, kind: number) {
        super(image, kind);

    }
}

class BoySprite extends PlayerSprite {
    constructor(image: Image, kind: number) {
        super(image, kind);
    }

}

/*
*Enumerators
*/
//Names for each Boy animation
enum ActionKind {
    Walking,
    Idle
}

/*
*Namespaces
*/
//Set the different kinds of sprites
namespace SpriteKind {
    export const Boy = SpriteKind.create();
    export const Girl = SpriteKind.create();
    export const Treasure = SpriteKind.create();
    export const Goal = SpriteKind.create();
}

//Create images for sprites and tiles and backgrounds
namespace customArt {
    //images for tilemaps
    export const Chest = assets.image`ChestImage`;
    export const Wall = assets.image`WallImage`;
    export const Door = assets.image`DoorImage`;

    export const Projectile = sprites.projectile.explosion1;
    export const Slime = assets.image`SlimeImage`;

    //images for boySprite animation
    export const BoyImageRight1 = assets.image`BoyImageRight1`;
    export const BoyImageRight2 = assets.image`BoyImageRight2`;
    export const BoyImageRight3 = assets.image`BoyImageRight3`;
    export const BoyImageLeft1 = assets.image`BoyImageLeft1`;
    export const BoyImageLeft2 = assets.image`BoyImageLeft2`;
    export const BoyImageLeft3 = assets.image`BoyImageLeft3`;
    export const BoyImageUp1 = assets.image`BoyImageUp1`;
    export const BoyImageUp2 = assets.image`BoyImageUp2`;
    export const BoyImageUp3 = assets.image`BoyImageUp3`;
    export const BoyImageDown1 = assets.image`BoyImageDown1`;
    export const BoyImageDown2 = assets.image`BoyImageDown2`;
    export const BoyImageDown3 =assets.image`BoyImageDown3`;
    export const BoyImageIdle = BoyImageDown2;
    // export const GirlImage = assets.image`GirlImage`;
}

//Create and attach animations to each movement of Boy
namespace animation {
    controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
        let rightAnim = animation.createAnimation(0, 150);
        animation.attachAnimation(playerSprite, rightAnim);
        rightAnim.addAnimationFrame(customArt.BoyImageRight1);
        rightAnim.addAnimationFrame(customArt.BoyImageRight2);
        rightAnim.addAnimationFrame(customArt.BoyImageRight3);
        animation.setAction(playerSprite, ActionKind.Walking);
    })

    controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
        let leftAnim = animation.createAnimation(0, 150);
        animation.attachAnimation(playerSprite, leftAnim);
        leftAnim.addAnimationFrame(customArt.BoyImageLeft1);
        leftAnim.addAnimationFrame(customArt.BoyImageLeft2);
        leftAnim.addAnimationFrame(customArt.BoyImageLeft3);
        animation.setAction(playerSprite, ActionKind.Walking);
    })

    controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
        let upAnim = animation.createAnimation(0, 150);
        animation.attachAnimation(playerSprite, upAnim);
        upAnim.addAnimationFrame(customArt.BoyImageUp1);
        upAnim.addAnimationFrame(customArt.BoyImageUp2);
        upAnim.addAnimationFrame(customArt.BoyImageUp3);
        animation.setAction(playerSprite, ActionKind.Walking);
    })

    controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
        let downAnim = animation.createAnimation(0, 150);
        animation.attachAnimation(playerSprite, downAnim);
        downAnim.addAnimationFrame(customArt.BoyImageDown1);
        downAnim.addAnimationFrame(customArt.BoyImageDown2);
        downAnim.addAnimationFrame(customArt.BoyImageDown3);
        animation.setAction(playerSprite, ActionKind.Walking);
    })
    //for some reason this code doesn't work?
    controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
        let idleAnim = animation.createAnimation(0, 150);
        animation.attachAnimation(playerSprite, idleAnim);
        idleAnim.addAnimationFrame(customArt.BoyImageIdle);
        animation.setAction(playerSprite, ActionKind.Idle);
    })
}

//Setup the levels
namespace level {
    //Setup the scene
    function setupScene(): void {
        scene.setTile(12, customArt.Wall, true);
        doorSprite = sprites.create(customArt.Door, SpriteKind.Goal);

    }

    //Generates enemies
    export function generateEnemies(): void {
        let enemyNo = 5;
        let enemyList = [];
        for (let i = 0; i < enemyNo; i++) {
            enemyList.push(new EnemySprite(customArt.Slime, SpriteKind.Enemy));
        }
        for (let enemySprite of sprites.allOfKind(SpriteKind.Enemy)) {
            enemySprite.setPosition(Math.randomRange(20, 300), Math.randomRange(10, 220));
        }
    }

    //Creates first level
    function createLevelOne(): void {
        setupScene();
        chestSprite = sprites.create(customArt.Chest, SpriteKind.Treasure);
        // chestSprite.setPosition(40, 40);
        tiles.placeOnTile(chestSprite, tiles.getTileLocation(2, 2));
        //Create chest tile instead of sprite
        // scene.setTile(11, customArt.Chest, true);
        doorSprite.setPosition(296, 8);
        generateEnemies();
        scene.setTileMap(assets.image`FirstTileMap`);
    }

    //Creates second level
    function createLevelTwo(): void {
        setupScene();
        doorSprite.setPosition(184, 8);
        scene.setTileMap(assets.image`SecondTileMap`);
        generateEnemies();
    }

    //Creates third level
    function createLevelThree(): void {
        setupScene();
        doorSprite.setPosition(200, 8);
        scene.setTileMap(assets.image`ThirdTileMap`);
        generateEnemies();
    }
    //Loads called level
    export function loadLevel(index: number): void {
        switch (index) {
            case 1: return createLevelOne();
            case 2: return createLevelTwo();
            case 3: return createLevelThree();
        }
    }
}

//Create namespace overlapEvents
namespace overlapEvents {
    //Overlap event for player and goal
    sprites.onOverlap(SpriteKind.Boy, SpriteKind.Goal, function (sprite: Sprite, otherSprite: Sprite) {
        if (loadedLevel === maxLevel) {
            game.over(true);
        }
        else {
            doorSprite.destroy();
            loadedLevel++;
            level.loadLevel(loadedLevel);
        }
    })
    //Overlap event for player and treasure
    sprites.onOverlap(SpriteKind.Boy, SpriteKind.Treasure, function (sprite: Sprite, otherSprite: Sprite) {
        chestSprite.destroy();
        info.changeScoreBy(100);
        music.baDing.play();

    })
    //Overlap event for player and enemies
    sprites.onOverlap(SpriteKind.Boy, SpriteKind.Enemy, function (sprite, otherSprite) {
        for (let slime of sprites.allOfKind(SpriteKind.Enemy)) {
            if (playerSprite.overlapsWith(slime)) {
                info.changeLifeBy(-1);
                slime.destroy();
                music.powerDown.play();
            }
        }
    })
    //Overlap event for projectiles and enemies
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
        for (let slime of sprites.allOfKind(SpriteKind.Enemy)) {
            if (projectileSprite.overlapsWith(slime)) {
                slime.destroy();
                music.magicWand.play();
                info.changeScoreBy(10);
                projectileSprite.destroy();
            }
        }
    })
}

//Create namespace player
namespace player {
    //Create player sprite and initializes its properties
    export function createPlayer() {
        // playerSprite = sprites.create(customArt.BoyImageIdle, SpriteKind.Boy);
        playerSprite = new BoySprite(customArt.BoyImageIdle, SpriteKind.Boy);
        info.setLife(3);
        scene.cameraFollowSprite(playerSprite);
        controller.moveSprite(playerSprite, 100, 100);
        //Check animation image to fire projectiles in direction player is facing
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (playerSprite.image == customArt.BoyImageRight1 || playerSprite.image == customArt.BoyImageRight2 || playerSprite.image == customArt.BoyImageRight3) {
                projectileSprite = sprites.createProjectileFromSprite(customArt.Projectile, playerSprite, 50, 0);
                music.pewPew.play();
            }
            else if (playerSprite.image == customArt.BoyImageLeft1 || playerSprite.image == customArt.BoyImageLeft2 || playerSprite.image == customArt.BoyImageLeft3) {
                projectileSprite = sprites.createProjectileFromSprite(customArt.Projectile, playerSprite, -50, 0);
                music.pewPew.play();
            }
            else if (playerSprite.image == customArt.BoyImageUp1 || playerSprite.image == customArt.BoyImageUp2 || playerSprite.image == customArt.BoyImageUp3) {
                projectileSprite = sprites.createProjectileFromSprite(customArt.Projectile, playerSprite, 0, -50);
                music.pewPew.play();
            }
            else if (playerSprite.image == customArt.BoyImageDown1 || playerSprite.image == customArt.BoyImageDown2 || playerSprite.image == customArt.BoyImageDown3) {
                projectileSprite = sprites.createProjectileFromSprite(customArt.Projectile, playerSprite, 0, 50);
                music.pewPew.play();
            }
        })
    }
}

/*
*Functions
*/

// Sets up the background, sprites and tiles for our levels
function setupScene(): void {
    scene.setTile(12, customArt.Wall, true);
    scene.setBackgroundImage(assets.image`TealBackground`);
    doorSprite = sprites.create(customArt.Door, SpriteKind.Goal);
    playerSprite.setPosition(45, 200);
}

/*
*EventHandlers
*/

//Enemy sprites follow player
game.onUpdateInterval(1000, function () {
    for (let slime of sprites.allOfKind(SpriteKind.Enemy)) {
        // follow the player
        if (slime.x < playerSprite.x) {
            slime.vx = 15;
        } else {
            slime.vx = -15;
        }
        if (slime.y < playerSprite.y) {
            slime.vy = 15;
        } else {
            slime.vy = -15;
        }
    }
})

/*
*Main
*/
game.splash(intro);

//Call createPlayer and loadLevel functions
player.createPlayer();
level.loadLevel(1);
// level.generateEnemies();