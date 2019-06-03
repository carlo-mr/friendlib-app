import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LoggedUser} from '../../../auth/models/auth.model';
import {Avataaars, AvataaarsConfig} from '../../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-avatar-change',
  templateUrl: './avatar-change.component.html'
})
export class AvatarChangeComponent implements OnInit, OnChanges {

  @Input() user: LoggedUser;

  @Output() change = new EventEmitter<AvataaarsConfig>();

  private dirty: boolean;
  private savedAvatar: AvataaarsConfig;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user && this.user.avatar) {
      this.savedAvatar = {...this.user.avatar} as AvataaarsConfig;
    }
  }

  onGenerateClicked() {
    this.dirty = true;
    this.user.avatar = {
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

  onSaveClicked() {
    this.popoverCtrl.dismiss({avatar: this.user.avatar});
  }

  onCloseClicked() {
    this.popoverCtrl.dismiss({avatar: this.savedAvatar});
  }

  getRandomEnumValue(enumClass: any) {
    const enumValues = Object.keys(enumClass);
    const randomIndex = Math.round(Math.random() * enumValues.length - 1);
    return enumClass[enumValues[randomIndex]];
  }
}
