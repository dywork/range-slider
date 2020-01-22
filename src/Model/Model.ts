interface IModel {
  getText(): string;
}

class Model implements IModel {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  getText = () => {
    return this.text;
  };
}

export default Model;
export {IModel};
