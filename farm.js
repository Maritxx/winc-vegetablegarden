const getYieldForPlant = function(plant, environmentFactors) {
    if (!environmentFactors) {
        return plant.yield; 
    } else {
        let yieldOfPlant = plant.yield;
        Object.keys(environmentFactors).forEach((key) => {
            const factorKey = environmentFactors[key];
            const plantKey = plant.factor[key];
            yieldOfPlant = yieldOfPlant / 100 * (100 + plantKey[factorKey]);
        })
        return yieldOfPlant;
    };
};

const getYieldForCrop = function(plant, environmentFactors) {
    if(!environmentFactors) {
        return getYieldForPlant(plant.crop) * plant.numCrops;
    } else {
        return getYieldForPlant(plant.crop, environmentFactors) * plant.numCrops;
    }
};

const getTotalYield = function(input, environmentFactors) {
    if(!environmentFactors) {
        let totalYield = 0;
        input.crops.forEach((crop) => {
            totalYield += getYieldForCrop(crop);
        });
        return totalYield;
    } else {
        let totalYield = 0;
        input.crops.forEach((crop) => {
            totalYield += getYieldForCrop(crop, environmentFactors);
        });
        return totalYield;
    }
};

const getCostsForCrop = function(plant) {
    return plant.numCrops * plant.crop.cost;
};

const getRevenueForCrop = function(plant, environmentFactors) {
    if (!environmentFactors) {
        return getYieldForCrop(plant) * plant.crop.salePrice;
    } else {
        return getYieldForCrop(plant, environmentFactors) * plant.crop.salePrice;
    }
    
};

const getProfitForCrop = function(plant, environmentFactors) {
    if (!environmentFactors) {
        return getRevenueForCrop(plant) - getCostsForCrop(plant);
    } else {
        return getRevenueForCrop(plant, environmentFactors) - getCostsForCrop(plant, environmentFactors);
    }
};

const getTotalProfit = function(input, environmentFactors) {
    if (!environmentFactors) {
        let totalProfit = 0;
        input.crops.forEach((crop) => {
            totalProfit += getProfitForCrop(crop);
        });
        return totalProfit;
    } else {
        let totalProfit = 0;
        input.crops.forEach((crop) => {
            totalProfit += getProfitForCrop(crop, environmentFactors);
        });
        return totalProfit;   
    }
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};