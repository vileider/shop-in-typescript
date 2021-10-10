import { CustomFetch } from './CustomFetch';
import { AccesToServerPath } from '../../maintence/AccesToServerPath';
export const loadListEndPoint = [
    'vegAndFruit',
    'chemicals',
    'dinners',
    'dairyWheatAndEggs',
    'everythingElse'];


export const AllFruitsFromDatabase = () => {
    let loadList: Array<string> = [];
    loadListEndPoint.forEach(async x => {
        const data = await CustomFetch(`${AccesToServerPath()}${x}`, 'GET')
        loadList.push(data)
    })
    return loadList;
}