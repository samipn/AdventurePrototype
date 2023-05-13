class BankFront extends AdventureScene {
    constructor() {
        super("bankfront", "Lets get to work");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('drill', 'drill.png');
        this.load.image('bankfront', 'bankfront.png');
        this.load.image('bankdoor', 'bankdoor.png');
    }
    onEnter() {

        const bankfront = this.add.image(600, 560, 'bankfront');
        bankfront.setDepth(-1);
        bankfront.setScale(.91);

        /*let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });*/

        let drill = this.add.image(
            250,
            1000,
            'drill',
            );
            drill.setInteractive()
            drill.setScale(.5)
            .on('pointerover', () => {
                this.showMessage("This could be useful later.")
            })
            .on('pointerdown', () => {
                this.showMessage("You put the drill in your bag.");
                this.gainItem('drill');
                this.tweens.add({
                    targets: drill,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => drill.destroy()
                });
            })

        let bankDoor = this.add.image(
            550,
            563,
            'bankdoor',
            );
            bankDoor.setInteractive()
            bankDoor.setScale(.5)
            bankDoor.on('pointerover', () => {
                this.showMessage("Open the front door");
            })
            bankDoor.on('pointerdown', () => {
                this.showMessage("*whoosh*");
                this.gotoScene('demo2');
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('bankfront');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "The Heist Adventure").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('bankfront'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, BankFront, Demo2, Outro],
    title: "Adventure Game",
});

