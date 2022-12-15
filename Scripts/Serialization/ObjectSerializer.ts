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

    public static readTextFile(urlToFile: string, callback: (text: string | null) => void) {
        fetch(urlToFile, {
            method: "GET",
            mode: "no-cors"
        })
        .then(function(response) {
            if (response.status == 200) {
                return response.text();
            } else {
                console.log(urlToFile + " doesn't exist!");
                callback(null);
            }
        })
        .then((data) => {
            if(data) callback(data);
        })
        .catch(function(error) {
            console.log("Error ", error);
        });
    }
}