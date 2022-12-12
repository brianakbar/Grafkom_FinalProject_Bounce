export class ObjectSerializer {
    public static serialize(object: object) {
        return JSON.stringify(object);
    }

    public static deserialize(string: string) {
        return JSON.parse(string);
    }

    public static download(filename: string, text: string) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    public static readTextFile(file: string, callback: (text: string | null) => void) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onerror = function() {
            if(rawFile.status == 404) {
                callback(null);
            }
        }
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == 200) {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
}