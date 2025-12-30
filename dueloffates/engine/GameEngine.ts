type Listner = () => void;

export abstract class GameEngine {
  private listners = new Set<Listner>();

  public subscribe(listner: Listner) {
    this.listners.add(listner);
    return () => {
      this.listners.delete(listner);
    };
  }

  protected notify() {
    this.listners.forEach((l) => l());
  }
}
