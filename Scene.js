class Scene {
  constructor(_gameEntities, _tickRate, _type,_buffer) {
    this.tickRate = _tickRate;
    this.gameEntities = _gameEntities;
    this.buffer = _buffer
    this.gameEntities.sort((a, b) => a.zHeight>b.zHeight?1:-1);
    this.entityCount = this.gameEntities.length;
    this.update= setInterval(() => {
        this.buffer.reset();
        for(let i = 0;i<this.entityCount;i++){
          this.gameEntities[i].updateEntity(this.buffer)
            if(this.gameEntities[i].wrap){
              //this.gameEntities[i].repeatX(this.buffer)
            }
        }
      }, this.tickRate);
  }
  
  add(gameEntity){
    this.entityCount+=1
    this.gameEntities.push(gameEntity)
    this.gameEntities.sort((a, b) => a.zHeight>b.zHeight);
  }
}
export{Scene}