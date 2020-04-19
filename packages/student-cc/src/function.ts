
function hashStringToInt(s, tableSize) {
    let hash = 17;
  
    for (let i = 0; i < s.length; i++) {
      hash = (13 * hash * s.charCodeAt(i)) % tableSize;
    }
  
    return hash;
  }
  
 export  class HashTable {
    table = new Array(101);
    votes = 0;
  
    resize = () => {
      const newTable = new Array(this.table.length * 2);
      this.table.forEach(item => {
        if (item) {
          item.forEach(([key, value]) => {
            const idx = hashStringToInt(key, newTable.length);
            if (newTable[idx]) {
              newTable[idx].push([key, value]);
            } else {
              newTable[idx] = [[key, value]];
            }
          });
        }
      });
      this.table = newTable;
    };
  
    setItem = (key, value) => {
      this.votes++;
      const loadFactor = this.votes / this.table.length;
      if (loadFactor > 0.8) {
        // resize
        this.resize();
      }
  
      const idx = hashStringToInt(key, this.table.length);
      if (this.table[idx]) {
        this.table[idx].push([key, value]);
      } else {
        this.table[idx] = [[key, value]];
      }
    };
  
    getItem = key => {
      const idx = hashStringToInt(key, this.table.length);
  
      if (!this.table[idx]) {
        return null;
      }
  
      // O(n)
      return this.table[idx].find(x => x[0] === key)[1];
    };
  }