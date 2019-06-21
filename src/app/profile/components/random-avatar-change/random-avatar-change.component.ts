import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LoggedUser} from '../../../auth/models/auth.model';
import {Avataaars, AvataaarsConfig} from '../../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-random-avatar-change',
  templateUrl: './random-avatar-change.component.html'
})
export class RandomAvatarChangeComponent implements OnInit, OnChanges {

  @Input() user: LoggedUser;

  @Output() change = new EventEmitter<AvataaarsConfig>();

  private savedAvatar: AvataaarsConfig;

  generatedAvataaars: AvataaarsConfig[] = [];

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.generateAvataaars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user && this.user.avatar) {
      this.savedAvatar = {...this.user.avatar} as AvataaarsConfig;
    }
  }

  onGenerateClicked() {
    this.generateAvataaars();
  }

  generateAvataaars() {
    this.generatedAvataaars = [];
    for (let i = 0; i < 9; i++) {
      this.generatedAvataaars.push(this.generateAvataaar());
    }
  }

  onAvataaarSelected(avatar) {
    this.popoverCtrl.dismiss({avatar: avatar});
  }

  onCloseClicked() {
    this.popoverCtrl.dismiss({avatar: this.savedAvatar});
  }

  generateAvataaar() {
    return {
      avatarStyle: Avataaars.AvatarStyle.TRANSPARENT,
      accessoriesType: this.getRandomEnumValue(Avataaars.Accessories),
      clotheType: this.getRandomEnumValue(Avataaars.Clothe),
      eyeType: this.getRandomEnumValue(Avataaars.Eye),
      eyebrowType: this.getRandomEnumValue(Avataaars.Eyebrow),
      facialHairType: this.getRandomEnumValue(Avataaars.FacialHair),
      hairColor: this.getRandomEnumValue(Avataaars.HairColor),
      mouthType: this.getRandomEnumValue(Avataaars.Mouth),
      skinColor: this.getRandomEnumValue(Avataaars.SkinColor),
      topType: this.getRandomEnumValue(Avataaars.Top)
    } as AvataaarsConfig;
  }

  getRandomEnumValue(enumClass: any) {
    const enumValues = Object.keys(enumClass);
    const randomIndex = Math.round(Math.random() * enumValues.length - 1);
    return enumClass[enumValues[randomIndex]];
  }
}
