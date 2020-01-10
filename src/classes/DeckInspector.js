import find from 'lodash/find';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import difference from 'lodash/difference';

class DeckInspector {
  constructor(slots, format) {
    this.slots = slots;
    this.format = format;
    this.stronghold = this.findCardByType('stronghold');
    this.clan = this.stronghold ? this.stronghold.clan : null;
    this.role = this.findCardByType('role');
    this.supportingClan = null;
  }

  findCardByType(type) {
    return DeckInspector.findCardByType(this.slots, type);
  }

  findSlotsBy(keyName, key) {
    return DeckInspector.findSlotsBy(this.slots, keyName, key);
  }

  getInfluencePool() {
    let influencePool = 0;

    if (this.stronghold) {
      influencePool = this.stronghold.influence_pool;
    }

    if (this.role) {
      if (this.role.traits.includes('keeper')) {
        influencePool += 3;
      } else if (this.role.id.indexOf('support-of-the-') === 0) {
        influencePool += 8;
        this.supportingClan = this.role.traits[0];
      }
    }

    return influencePool;
  }

  getInfluenceSpent() {
    return this.findSlotsBy('side', 'conflict').reduce((influenceSpent, slot) => {
      if (this.clan && slot.card.clan === this.clan) {
        return influenceSpent;
      }

      return influenceSpent + (slot.quantity * slot.card.influence_cost);
    }, 0);
  }

  count() {
    return DeckInspector.count(this.slots);
  }

  findProblem() {
    return this.checkCardCopies()
      || this.checkStrongholdDeck()
      || this.checkRoleDeck()
      || this.checkProvinceDeck()
      || this.checkDynastyDeck()
      || this.checkConflictDeck()
      || this.checkRestrictedAndBannedCards()
      || this.checkRoleRestrictedCards();
  }

  checkCardCopies() {
    if (find(this.slots, slot => slot.quantity > slot.card.deck_limit)) {
      return 1;
    }

    return 0;
  }

  checkStrongholdDeck() {
    const strongholdDeck = this.findSlotsBy('type', 'stronghold');
    const strongholdCount = DeckInspector.count(strongholdDeck);

    if (strongholdCount < 1) {
      return 2;
    }

    if (strongholdCount > 1) {
      return 3;
    }

    return 0;
  }

  checkRoleDeck() {
    const roleDeck = this.findSlotsBy('type', 'role');
    const roleCount = DeckInspector.count(roleDeck);

    if (roleCount > 1) {
      return 4;
    }

    return 0;
  }

  checkProvinceDeck() {
    const provinceDeck = this.findSlotsBy('type', 'province');
    const provinceCount = DeckInspector.count(provinceDeck);

    if (provinceCount < 5) {
      return 13;
    }

    if (provinceCount > 5) {
      return 14;
    }

    const allElements = ['air', 'earth', 'fire', 'void', 'water'];
    const isSeeker = this.role && this.role.traits.includes('seeker');
    const seekerElement = isSeeker ? this.role.traits.find(trait => allElements.includes(trait)) : '';
    const provinceCards = provinceDeck.map(slot => slot.card);
    const singleElementProvinces = provinceCards.filter(card => card.element != null && card.element.length === 1);
    const multipleElementProvinces = provinceCards.filter(card => card.element != null && card.element.length > 1);

    let permutations = [singleElementProvinces.map(province => province.element[0])];

    for (const province of multipleElementProvinces) {
      const newPermutations = [];
      for (const element of province.element) {
        for (const permutation of permutations) {
          const newPermutation = Array.from(permutation);
          newPermutation.push(element);
          newPermutations.push(newPermutation);
        }
      }
      permutations = Array.from(newPermutations);
    }

    let legal = false;

    for (const permutation of permutations) {
      const uniqueElements = uniq(permutation);
      if (uniqueElements.length === 5) {
        legal = true;
      } else if (isSeeker && uniqueElements.length === 4 && permutation.filter(element => element === seekerElement).length === 2) {
        legal = true;
      }
    }

    if (!legal) {
      return 15;
    }

    if (this.clan) {
      const offclans = DeckInspector.findSlotsOffClan(provinceDeck, this.clan);
      if (offclans.length > 0) {
        return 16;
      }
    }

    return 0;
  }

  checkDynastyDeck() {
    const dynastyDeck = this.findSlotsBy('side', 'dynasty');
    const dynastyCount = DeckInspector.count(dynastyDeck);

    const minCount = this.format === 'single-core' ? 30 : 40;
    if (dynastyCount < minCount) {
      return 5;
    }

    const maxCount = this.format === 'single-core' ? 30 : 45;
    if (dynastyCount > maxCount) {
      return 6;
    }

    if (this.clan) {
      const offclans = DeckInspector.findSlotsOffClan(dynastyDeck, this.clan);
      if (offclans.length > 0) {
        return 7;
      }
    }

    return 0;
  }

  checkConflictDeck() {
    const conflictDeck = this.findSlotsBy('side', 'conflict');
    const conflictCount = DeckInspector.count(conflictDeck);

    const minCount = this.format === 'single-core' ? 30 : 40;
    if (conflictCount < minCount) {
      return 8;
    }

    const maxCount = this.format === 'single-core' ? 30 : 45;
    if (conflictCount > maxCount) {
      return 9;
    }

    if (this.clan) {
      let influencePool = this.getInfluencePool();

      const offclans = DeckInspector.findSlotsOffClan(conflictDeck, this.clan);
      let undefinedInfluenceCost = false, unsupportedClan = false;

      offclans.forEach((slot) => {
        if (slot.card.influence_cost === undefined) {
          undefinedInfluenceCost = true;
          return;
        }
        if (this.supportingClan !== null && slot.card.clan !== this.supportingClan) {
          unsupportedClan = true;
          return;
        }
        influencePool -= slot.quantity * slot.card.influence_cost;
      });

      if (undefinedInfluenceCost) {
        return 17;
      }

      if (unsupportedClan) {
        return 18;
      }

      if (influencePool < 0) {
        return 10;
      }

      if (uniq(offclans.map(slot => slot.card.clan)).length > 1) {
        return 11;
      }
    }

    return 0;
  }

  checkRestrictedAndBannedCards() {
    if (find(this.slots, slot => slot.card != null && slot.card.is_banned)) {
      return 20;
    }

    if (this.slots.filter(slot => slot.card != null && slot.card.is_restricted).length > 1) {
      return 21;
    }

    return 0;
  }

  checkRoleRestrictedCards() {
    const roleRestrictedCards = DeckInspector.findRoleRestrictedCards(this.slots);
    console.log(roleRestrictedCards);
    console.log(this.role.traits);

    for (const card of roleRestrictedCards) {
      if (!this.role.traits.includes(card.role_restriction)) {
        return 19;
      }
    }

    return 0;
  }

  /**
   * static functions
   */

  static findSlotsOffClan(slots, clan) {
    return slots.filter(slot => slot.card.clan !== clan && slot.card.clan !== 'neutral');
  }

  static findCardByType(slots, type) {
    return slots.map(slot => slot.card).find(card => card.type === type);
  }

  static findSlotsBy(slots, keyName, key) {
    return slots.filter(slot => slot.card[keyName] === key);
  }

  static findRoleRestrictedCards(slots) {
    return slots.filter(slot => slot.card.role_restriction != null).map(slot => slot.card);
  }

  static count(slots) {
    return map(slots, 'quantity').reduce((a, b) => a + b, 0);
  }
}

export default DeckInspector;
