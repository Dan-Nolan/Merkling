const MerkleTree = require("./MerkleTree");
const SHA256 = require("crypto-js/sha256");

const leaves = ['D', 'A', 'C', 'B', 'E', 'F', 'G'];
const fn = (a,b) => SHA256(a.toString() + b.toString());
// comment this in for debugging!
// const fn = (a,b) => `Hash(${a} + ${b})`;

const tree = new MerkleTree(leaves, fn);

const root = tree.getRoot();
// lets prove that E is in the DACBEFG tree!
const proof = tree.getProof(4); 

let node = leaves[4];
for(let i = 0; i < proof.length; i++) {
    if(proof[i].left) {
        node = fn(proof[i].data, node);
    }
    else {
        node = fn(node, proof[i].data);
    }
}

console.log(node.toString());
console.log(root.toString());
console.log(node.toString() === root.toString());
