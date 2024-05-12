export class BaseCardView {
	getCategoryColor(category: string): string {
		if (category == 'софт-скил') {
			return '#83fa9d';
		}
		if (category == 'дополнительное') {
			return '#b783fa';
		}
		if (category == 'кнопка') {
			return '#83ddfa';
		}
		if (category == 'хард-скил') {
			return '#faa083';
		}

		return '#fad883';
	}
}