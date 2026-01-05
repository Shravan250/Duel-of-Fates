type Listner = () => void;

export class GameEngine {
  private listners = new Set<Listner>();
  private batching = false;
  private dirty = false;

  public subscribe(listner: Listner) {
    this.listners.add(listner);
    return () => {
      this.listners.delete(listner);
    };
  }

  protected notify() {
    if (this.batching) {
      this.dirty = true;
      return;
    }

    this.listners.forEach((l) => l());
  }

  public beginBatch() {
    this.batching = true;
    this.dirty = true;
  }

  public endBatch() {
    this.batching = false;

    if (this.dirty) {
      this.listners.forEach((l) => l());
      this.dirty = false;
    }
  }
}
