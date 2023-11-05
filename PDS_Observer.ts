// Classe base do Editor
class Editor {
    private content: string = '';
    private observers: EditorObserver[] = [];
  
    addObserver(observer: EditorObserver) {
      this.observers.push(observer);
    }
  
    removeObserver(observer: EditorObserver) {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  
    notifyObservers() {
      for (const observer of this.observers) {
        observer.update(this);
      }
    }
  
    getContent() {
      return this.content;
    }
  
    setContent(content: string) {
      this.content = content;
      this.notifyObservers();
    }
  }
  
  // Interface para os observadores do Editor
  interface EditorObserver {
    update(editor: Editor): void;
  }
  
  // Classe TextEditor que é uma subclasse de Editor
  class TextEditor extends Editor {
    insertLine(lineNumber: number, text: string) {
      const lines = this.getContent().split('\n');
      lines.splice(lineNumber, 0, text);
      this.setContent(lines.join('\n'));
    }
  
    removeLine(lineNumber: number) {
      const lines = this.getContent().split('\n');
      if (lineNumber >= 0 && lineNumber < lines.length) {
        lines.splice(lineNumber, 1);
        this.setContent(lines.join('\n'));
      }
    }
  }
  
  // Observador que imprime o conteúdo do Editor quando ele é atualizado
  class PrintObserver implements EditorObserver {
    update(editor: Editor) {
      console.log('Conteúdo do Editor atualizado:');
      console.log(editor.getContent());
    }
  }
  
  // Função para receber as linhas de texto do usuário
  function receberLinhasDeTexto(editor: TextEditor) {
    const lines: string[] = [];
    console.log('Digite as linhas de texto (Digite "EOF" para encerrar):');
    while (true) {
      const line = prompt('Linha de texto: ');
      if (line === 'EOF') {
        break;
      }
      lines.push(line);
    }
    return lines;
  }
  
  // Exemplo de uso
  const textEditor = new TextEditor();
  const printObserver = new PrintObserver();
  
  textEditor.addObserver(printObserver);
  textEditor.setContent('Texto inicial.');
  
  textEditor.insertLine(1, 'Nova linha 1');
  textEditor.insertLine(0, 'Nova linha 0');
  textEditor.removeLine(2);
  
  const newLines = receberLinhasDeTexto(textEditor);
  
  for (const line of newLines) {
    textEditor.insertLine(textEditor.getContent().split('\n').length, line);
  }
  
  textEditor.notifyObservers();
  