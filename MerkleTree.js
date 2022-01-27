class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getProof(index) {
        const proof = [];
        let layer = this.leaves;
        while(layer.length > 1) {
            let newLayer = [];
            for(let i = 0; i < layer.length; i+=2) {
                const left = layer[i];
                const right = layer[i+1];
                if(right) {
                    // A B
                    if(i === index) {
                        // we want to push the right element 
                        proof.push({
                            data: right,
                            left: false
                        });
                    }
                    else if (index === i + 1) {
                        // we want to push the left element 
                        proof.push({
                            data: left,
                            left: true
                        });
                    }
                    newLayer.push(this.concat(left, right));
                }
                else {
                    newLayer.push(left);
                }
            }
            index = Math.floor(index / 2);
            layer = newLayer;
        }

        return proof;
    }
    getRoot(layer = this.leaves) {
        if(layer.length === 1) {
            return layer[0];
        }

        let newLayer = [];
        for(let i = 0; i < layer.length; i+=2) {
            const left = layer[i];
            const right = layer[i+1];
            if(right) {
                newLayer.push(this.concat(left, right));
            }
            else {
                newLayer.push(left);
            }
        }
        
        return this.getRoot(newLayer);
    }
}

module.exports = MerkleTree;