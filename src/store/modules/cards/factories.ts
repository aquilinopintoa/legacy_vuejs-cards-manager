import moment from 'moment';
import { CardRawInterface, CardInterface} from './interfaces';

const DEFAULT_URL = 'https://cdn.vuetifyjs.com/images/cards/desert.jpg';

export const FactoryCard = (raw: CardRawInterface): CardInterface => {
    const createdAt = moment().format();
    return {
        id: `${raw.title}${createdAt}`,
        createdAt,
        ...raw,
        url: raw.url || DEFAULT_URL
    };
};
