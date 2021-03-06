angular.module('SpaceClickyGameApp')
.factory('Shop', ['Player','GameObjects', 'NotificationCenter', function (Player, GameObjects, NotificationCenter) {
	return {
		purchaseMenuOpen: false,
		togglePurchasesMenu: function () {
			this.purchaseMenuOpen = !this.purchaseMenuOpen;
		},
		purchaseOptions: GameObjects.tiers[Player.tier].upgrades,
		purchaseUpgrade: function(purchase) {
			
			var player = Player;
		
			if(!player.purchasedUpgrades[purchase.id]) {
				player.purchasedUpgrades[purchase.id] = 
				{
					purchase: purchase,
					amountOwned: 0
				};
			}
			if(purchase.maximum != null && player.purchasedUpgrades[purchase.id].amountOwned >= purchase.maximum) {
				NotificationCenter.addError('','You cannot have any more ' + purchase.name, 2000);
				return;
			}
			if(player.spendMoney(purchase.cost)) {
				player.purchasedUpgrades[purchase.id].amountOwned++;
				
				if(purchase.moneyPerTick) {
					player.moneyPerTick += purchase.moneyPerTick;
				}
				if(purchase.value) {
					player.multiplier += purchase.value;
				}
				
				purchase.cost *= purchase.costincrease;
				
				NotificationCenter.addNotification('Purchased', purchase.name);
			} else {
				NotificationCenter.addError('','You do not have enough money');
			}
		}
	}
}]	);