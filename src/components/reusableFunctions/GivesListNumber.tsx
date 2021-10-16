

export const GivesNumberOfRequiredList = (endpointName: string) => {
    switch (endpointName) {
        case 'vegAndFruit':
            return 0
        case 'chemicals':
            return 1
        case 'dinners':
            return 2
        case 'dairyWheatAndEggs':
            return 3
        case 'everythingElse':
            return 4
        default:
            return 0
    }

}