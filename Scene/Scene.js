class Scene {
  constructor(_gameEntities, _tickRate, _type, _buffer) {
    this.tickRate = _tickRate
    this.gameEntities = _gameEntities
    this.buffer = _buffer
    this.gameEntities.sort((a, b) => (a.zHeight > b.zHeight ? 1 : -1))
    console.log(this.gameEntities)
    this.entityCount = this.gameEntities.length
    let update = () => {
      //this.buffer.reset()
      for (let i = 0; i < this.entityCount; i++) {
        this.gameEntities[i].updateEntity(this.buffer)
        // if(this.gameEntities[i].wrap){
        //   //this.gameEntities[i].repeatX(this.buffer)
        // }
      }
      window.requestAnimationFrame(update)
    }
    window.requestAnimationFrame(update)
  }

  add(gameEntity) {
    this.entityCount += 1
    this.gameEntities.push(gameEntity)
    this.gameEntities.sort((a, b) => a.zHeight > b.zHeight)
  }
}
export { Scene }
