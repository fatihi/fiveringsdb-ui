class TypeIcons {
  constructor() {
    this.icons = {
      attachment: 'paperclip',
      character: 'user',
      event: 'bolt',
      holding: 'home',
      province: 'map-marker',
      role: 'asterisk',
      stronghold: 'university',
      treaty: 'gavel',
      warlord: 'flag',
    };
  }

  icon(type) {
    return this.icons[type];
  }
}

export default new TypeIcons();
