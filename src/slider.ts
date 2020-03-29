import { Model } from './Model/Model';
import { View } from './View/View';
import { Presenter } from './Presenter/Presenter';
import Observer from './Observer/Observer';

class Slider extends Observer {
  init = () => {
    const myModel = new Model({ currentValue: 0, minValue: 0, maxValue: 100 });
    const myView = new View(myModel.getOptions());
    const myPresenter = new Presenter(myModel, myView);
    myPresenter.init();
  };
}

const slider = new Slider();
slider.init();
