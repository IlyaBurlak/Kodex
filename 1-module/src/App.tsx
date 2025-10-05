import Calculator from "./components/Calculator";
import ArrayOperations from "./components/ArrayOperations";
import ImageOperations from "./components/ImageOperations";
import TextOperations from "./components/TextOperations";
import { ToastProvider } from "./components/ToastContext";
import { Tabs } from "./components/elements/Tabs";
import { FC } from "react";

const App: FC = () => {
    const tabs = [
        {
            key: 'basic',
            label: 'Калькулятор',
            content: <Calculator />
        },
        {
            key: 'array',
            label: 'Массивы',
            content: <ArrayOperations />
        },
        {
            key: 'image',
            label: 'Изображения',
            content: <ImageOperations />
        },
        {
            key: 'text',
            label: 'Текст',
            content: <TextOperations />
        }
    ];

    return (
      <ToastProvider>
          <div className="app-container">
              <Tabs tabs={tabs} defaultTab="basic" />
          </div>
      </ToastProvider>
    );
};

export default App;