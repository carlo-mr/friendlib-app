import {Component, Input, OnInit} from '@angular/core';

export interface AvataaarsConfig {
  avatarStyle: Avataaars.AvatarStyle;
  accessoriesType: Avataaars.Accessories;
  clotheType: Avataaars.Clothe;
  eyeType: Avataaars.Eye;
  eyebrowType: Avataaars.Eyebrow;
  facialHairType: Avataaars.FacialHair;
  hairColor: Avataaars.HairColor;
  mouthType: Avataaars.Mouth;
  skinColor: Avataaars.SkinColor;
  topType: Avataaars.Top;
}

export namespace Avataaars {
  export enum AvatarStyle {
    CIRCLE = 'Circle',
    TRANSPARENT = 'Transparent'
  }

  export enum Accessories {
    BLANK = 'Blank',
    KURT = 'Kurt',
    PRESCRIPTION01 = 'Prescription01',
    PRESCRIPTION02 = 'Prescription02',
    ROUND = 'Round',
    SUNGLASSES = 'Sunglasses',
    WAYFARERS = 'Wayfarers'
  }

  export enum HairColor {
    AUBURN = 'Auburn',
    BLACK = 'Black',
    BLONDE = 'Blonde',
    BLONDEGOLDEN = 'BlondeGolden',
    BROWN = 'Brown',
    BROWNDARK = 'BrownDark',
    PASTELPINK = 'PastelPink',
    PLATINUM = 'Platinum',
    RED = 'Red',
    SILVERGRAY = 'SilverGray'
  }

  export enum Top {
    NOHAIR = 'NoHair',
    EYEPATCH = 'Eyepatch',
    HAT = 'Hat',
    HIJAB = 'Hijab',
    TURBAN = 'Turban',
    WINTERHAT1 = 'WinterHat1',
    WINTERHAT2 = 'WinterHat2',
    WINTERHAT3 = 'WinterHat3',
    WINTERHAT4 = 'WinterHat4',
    LONGHAIRBIGHAIR = 'LongHairBigHair',
    LONGHAIRBOB = 'LongHairBob',
    LONGHAIRBUN = 'LongHairBun',
    LONGHAIRCURLY = 'LongHairCurly',
    LONGHAIRCURVY = 'LongHairCurvy',
    LONGHAIRDREADS = 'LongHairDreads',
    LONGHAIRFRIDA = 'LongHairFrida',
    LONGHAIRFRO = 'LongHairFro',
    LONGHAIRFROBAND = 'LongHairFroBand',
    LONGHAIRNOTTOOLONG = 'LongHairNotTooLong',
    LONGHAIRSHAVEDSIDES = 'LongHairShavedSides',
    LONGHAIRMIAWALLACE = 'LongHairMiaWallace',
    LONGHAIRSTRAIGHT = 'LongHairStraight',
    LONGHAIRSTRAIGHT2 = 'LongHairStraight2',
    LONGHAIRSTRAIGHTSTRAND = 'LongHairStraightStrand',
    SHORTHAIRDREADS01 = 'ShortHairDreads01',
    SHORTHAIRDREADS02 = 'ShortHairDreads02',
    SHORTHAIRFRIZZLE = 'ShortHairFrizzle',
    SHORTHAIRSHAGGYMULLET = 'ShortHairShaggyMullet',
    SHORTHAIRSHORTCURLY = 'ShortHairShortCurly',
    SHORTHAIRSHORTFLAT = 'ShortHairShortFlat',
    SHORTHAIRSHORTROUND = 'ShortHairShortRound',
    SHORTHAIRSHORTWAVED = 'ShortHairShortWaved',
    SHORTHAIRSIDES = 'ShortHairSides',
    SHORTHAIRTHECAESAR = 'ShortHairTheCaesar',
    SHORTHAIRTHECAESARSIDEPART = 'ShortHairTheCaesarSidePart'
  }

  export enum FacialHair {
    BLANK = 'Blank',
    BEARDMEDIUM = 'BeardMedium',
    BEARDLIGHT = 'BeardLight',
    BEARDMAGESTIC = 'BeardMagestic',
    MOUSTACHEFANCY = 'MoustacheFancy',
    MOUSTACHEMAGNUM = 'MoustacheMagnum'
  }

  export enum Clothe {
    BLAZERSHIRT = 'BlazerShirt',
    BLAZERSWEATER = 'BlazerSweater',
    COLLARSWEATER = 'CollarSweater',
    GRAPHICSHIRT = 'GraphicShirt',
    HOODIE = 'Hoodie',
    OVERALL = 'Overall',
    SHIRTCREWNECK = 'ShirtCrewNeck',
    SHIRTSCOOPNECK = 'ShirtScoopNeck',
    SHIRTVNECK = 'ShirtVNeck'
  }

  export enum Eye {
    CLOSE = 'Close',
    CRY = 'Cry',
    DEFAULT = 'Default',
    DIZZY = 'Dizzy',
    EYEROLL = 'EyeRoll',
    HAPPY = 'Happy',
    HEARTS = 'Hearts',
    SIDE = 'Side',
    SQUINT = 'Squint',
    SURPRISED = 'Surprised',
    WINK = 'Wink',
    WINKWACKY = 'WinkWacky'
  }

  export enum Eyebrow {
    ANGRY = 'Angry',
    ANGRYNATURAL = 'AngryNatural',
    DEFAULT = 'Default',
    DEFAULTNATURAL = 'DefaultNatural',
    FLATNATURAL = 'FlatNatural',
    RAISEDEXCITED = 'RaisedExcited',
    RAISEDEXCITEDNATURAL = 'RaisedExcitedNatural',
    SADCONCERNED = 'SadConcerned',
    SADCONCERNEDNATURAL = 'SadConcernedNatural',
    UNIBROWNATURAL = 'UnibrowNatural',
    UPDOWN = 'UpDown',
    UPDOWNNATURAL = 'UpDownNatural'
  }

  export enum Mouth {
    CONCERNED = 'Concerned',
    DEFAULT = 'Default',
    DISBELIEF = 'Disbelief',
    EATING = 'Eating',
    GRIMACE = 'Grimace',
    SAD = 'Sad',
    SCREAMOPEN = 'ScreamOpen',
    SERIOUS = 'Serious',
    SMILE = 'Smile',
    TONGUE = 'Tongue',
    TWINKLE = 'Twinkle',
    VOMIT = 'Vomit'
  }

  export enum SkinColor {
    TANNED = 'Tanned',
    YELLOW = 'Yellow',
    PALE = 'Pale',
    LIGHT = 'Light',
    BROWN = 'Brown',
    DARKBROWN = 'DarkBrown',
    BLACK = 'Black',
  }
}

@Component({
  selector: 'app-avataaars-wrapper',
  template: `
    <img *ngIf="avataaarsConfig" src="{{buildUrl()}}">
  `
})
export class AvataaarsWrapperComponent implements OnInit {

  @Input() avataaarsConfig: AvataaarsConfig;

  constructor() {

  }

  ngOnInit(): void {

  }

  buildUrl() {
    const queryString = Object.keys(this.avataaarsConfig).map(key => key + '=' + this.avataaarsConfig[key]).join('&');
    return 'https://avataaars.io/?' + queryString;
  }


}
