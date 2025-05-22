document.addEventListener('DOMContentLoaded', () => {
    // Data for design patterns
    // Minified example code for brevity in this data structure.
    // Ideally, full code snippets from the previous response would be here.
    const designPatterns = [
        // --- CREATIONAL ---
        {
            id: "singleton",
            name: "Singleton (Instancia Única)",
            category: "Creational",
            purpose: "Asegurar que una clase tenga solo una instancia y proporcionar un punto de acceso global a ella.",
            analogy: "El gobierno de un país; solo puede haber un gobierno oficial a la vez. O el objeto `window` o `document` en JavaScript en el navegador.",
            whenToUse: "Cuando exactamente un objeto es necesario para coordinar acciones en todo el sistema (ej: gestor de configuración, un pool de conexiones a base de datos, un servicio de logging).",
            examples: {
                dart: `
class AppConfig {
  static final AppConfig _instance = AppConfig._internal();
  factory AppConfig() {
    return _instance;
  }
  AppConfig._internal() {
    print("AppConfig inicializado.");
    apiKey = "DEFAULT_KEY";
  }
  late String apiKey;
  void displayConfig() {
    print("API Key: $apiKey");
  }
}

void main() {
  AppConfig config1 = AppConfig();
  config1.apiKey = "DART_API_KEY_123";
  config1.displayConfig();
  AppConfig config2 = AppConfig();
  config2.displayConfig(); // Misma instancia
  print(identical(config1, config2)); // true
}`,
                python: `
class AppConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            print("Creando instancia de AppConfig")
            cls._instance = super(AppConfig, cls).__new__(cls)
            cls._instance.api_key = "DEFAULT_KEY"
        return cls._instance

    def display_config(self):
        print(f"API Key: {self.api_key}")

config1 = AppConfig()
config1.api_key = "PYTHON_API_KEY_123"
config1.display_config()
config2 = AppConfig() # No crea nueva instancia
config2.display_config()
print(config1 is config2) # True`,
                kotlin: `
object AppConfig { // Idiomatic Kotlin Singleton
    var apiKey: String = "DEFAULT_KEY"
    init {
        println("AppConfig inicializado (Kotlin object).")
    }
    fun displayConfig() {
        println("API Key: $apiKey")
    }
}

fun main() {
    AppConfig.apiKey = "KOTLIN_API_KEY_123"
    AppConfig.displayConfig()
    val config2 = AppConfig // Referencia a la misma instancia
    config2.displayConfig()
    println(AppConfig === config2) // true
}`,
                javascript: `
class AppConfig {
    constructor() {
        if (AppConfig.instance) {
            return AppConfig.instance;
        }
        console.log("Creando instancia de AppConfig");
        this.apiKey = "DEFAULT_KEY";
        AppConfig.instance = this;
    }

    displayConfig() {
        console.log(\`API Key: \${this.apiKey}\`);
    }

    static getInstance() { // Método opcional de acceso
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }
}

const config1 = new AppConfig();
config1.apiKey = "JS_API_KEY_123";
config1.displayConfig();
const config2 = new AppConfig(); // Devuelve la instancia existente
config2.displayConfig();
console.log(config1 === config2); // true`
            }
        },
        {
            id: "factory-method",
            name: "Factory Method (Método Fábrica)",
            category: "Creational",
            purpose: "Define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase concreta instanciar. Permite que una clase delegue la instanciación a subclases.",
            analogy: "Una empresa de logística. La empresa principal (`Creator`) sabe que necesita transportar mercancías (`Product`), pero las sucursales (`ConcreteCreator`) deciden si usar un camión (`ConcreteProductA`) o un barco (`ConcreteProductB`) según el destino.",
            whenToUse: "Cuando una clase no puede anticipar la clase de objetos que debe crear, o cuando una clase quiere que sus subclases especifiquen los objetos que crea.",
            examples: {
                dart: `
// Interfaz del Producto
abstract class Transport { void deliver(); }

// Productos Concretos
class Truck implements Transport { @override void deliver() => print("Entrega por camión"); }
class Ship implements Transport { @override void deliver() => print("Entrega por barco"); }

// Creador Abstracto
abstract class Logistics {
  Transport createTransport(); // Factory Method
  void planDelivery() {
    Transport transport = createTransport();
    print("Planificando entrega...");
    transport.deliver();
  }
}

// Creadores Concretos
class RoadLogistics extends Logistics { @override Transport createTransport() => Truck(); }
class SeaLogistics extends Logistics { @override Transport createTransport() => Ship(); }

void main() {
  Logistics roadLogistics = RoadLogistics();
  roadLogistics.planDelivery();
  Logistics seaLogistics = SeaLogistics();
  seaLogistics.planDelivery();
}`,
                python: `
from abc import ABC, abstractmethod

class Transport(ABC): @abstractmethod def deliver(self): pass
class Truck(Transport): def deliver(self): print("Entrega por camión")
class Ship(Transport): def deliver(self): print("Entrega por barco")

class Logistics(ABC):
    @abstractmethod def create_transport(self) -> Transport: pass # Factory Method
    def plan_delivery(self):
        transport = self.create_transport()
        print("Planificando entrega...")
        transport.deliver()

class RoadLogistics(Logistics): def create_transport(self) -> Transport: return Truck()
class SeaLogistics(Logistics): def create_transport(self) -> Transport: return Ship()

RoadLogistics().plan_delivery()
SeaLogistics().plan_delivery()`,
                kotlin: `
interface Transport { fun deliver() }
class Truck : Transport { override fun deliver() { println("Entrega por camión") } }
class Ship : Transport { override fun deliver() { println("Entrega por barco") } }

abstract class Logistics {
    abstract fun createTransport(): Transport // Factory Method
    fun planDelivery() {
        val transport = createTransport()
        println("Planificando entrega...")
        transport.deliver()
    }
}
class RoadLogistics : Logistics() { override fun createTransport(): Transport = Truck() }
class SeaLogistics : Logistics() { override fun createTransport(): Transport = Ship() }

fun main() {
    RoadLogistics().planDelivery()
    SeaLogistics().planDelivery()
}`,
                javascript: `
class Truck { deliver() { console.log("Entrega por camión"); } }
class Ship { deliver() { console.log("Entrega por barco"); } }

class Logistics { // Creator
    createTransport() { /* Sobrescribir en subclase */ throw new Error("Método no implementado"); }
    planDelivery() {
        const transport = this.createTransport();
        console.log("Planificando entrega...");
        transport.deliver();
    }
}
class RoadLogistics extends Logistics { createTransport() { return new Truck(); } }
class SeaLogistics extends Logistics { createTransport() { return new Ship(); } }

new RoadLogistics().planDelivery();
new SeaLogistics().planDelivery();`
            }
        },
        {
            id: "builder",
            name: "Builder (Constructor)",
            category: "Creational",
            purpose: "Separar la construcción de un objeto complejo de su representación, de modo que el mismo proceso de construcción pueda crear diferentes representaciones.",
            analogy: "Pedir una pizza personalizada. El \"Director\" es el cliente que dice qué quiere. El \"Builder\" es el chef que sabe cómo añadir cada ingrediente. El \"Producto\" es la pizza resultante.",
            whenToUse: "Cuando el algoritmo para crear un objeto complejo debe ser independiente de las partes que componen el objeto. Cuando la construcción de un objeto tiene muchos pasos opcionales.",
            examples: {
                dart: `
class Computer {
  String? cpu, ram, storage, gpu;
  void display() { print("PC: CPU=$cpu, RAM=$ram, Storage=$storage, GPU=\${gpu ?? 'Integrada'}"); }
}
abstract class ComputerBuilder {
  void buildCPU(); void buildRAM(); void buildStorage(); void buildGPU();
  Computer getComputer();
}
class GamingComputerBuilder implements ComputerBuilder {
  final Computer _pc = Computer();
  @override void buildCPU() { _pc.cpu = "Intel i9"; }
  @override void buildRAM() { _pc.ram = "32GB DDR5"; }
  @override void buildStorage() { _pc.storage = "1TB NVMe SSD"; }
  @override void buildGPU() { _pc.gpu = "NVIDIA RTX 4090"; }
  @override Computer getComputer() => _pc;
}
class ComputerDirector {
  void construct(ComputerBuilder builder) {
    builder.buildCPU(); builder.buildRAM(); builder.buildStorage(); builder.buildGPU();
  }
}
void main() {
  final director = ComputerDirector();
  final gamingBuilder = GamingComputerBuilder();
  director.construct(gamingBuilder);
  gamingBuilder.getComputer().display();
}`,
                python: `
class Computer:
    def __init__(self): self.cpu = self.ram = self.storage = self.gpu = None
    def display(self): print(f"PC: CPU={self.cpu}, RAM={self.ram}, Storage={self.storage}, GPU={self.gpu or 'Integrada'}")

class ComputerBuilder: # Interfaz conceptual
    def build_cpu(self): pass; def build_ram(self): pass # ...
    def get_computer(self): pass

class GamingComputerBuilder(ComputerBuilder):
    def __init__(self): self._pc = Computer()
    def build_cpu(self): self._pc.cpu = "Intel i9"; return self
    def build_ram(self): self._pc.ram = "32GB DDR5"; return self
    def build_storage(self): self._pc.storage = "1TB NVMe SSD"; return self
    def build_gpu(self): self._pc.gpu = "NVIDIA RTX 4090"; return self
    def get_computer(self): return self._pc

class ComputerDirector:
    def construct(self, builder: ComputerBuilder):
        builder.build_cpu().build_ram().build_storage().build_gpu()

director = ComputerDirector()
gaming_builder = GamingComputerBuilder()
director.construct(gaming_builder)
gaming_builder.get_computer().display()`,
                kotlin: `
data class Computer(var cpu: String? = null, var ram: String? = null, /*...*/) {
    fun display() { println("PC: CPU=$cpu, RAM=$ram, Storage=$storage, GPU=\${gpu ?: "Integrada"}") }
    var storage: String? = null; var gpu: String? = null
}
interface ComputerBuilder {
    fun buildCPU(): ComputerBuilder; fun buildRAM(): ComputerBuilder; /*...*/
    fun getComputer(): Computer
}
class GamingComputerBuilder : ComputerBuilder {
    private val pc = Computer()
    override fun buildCPU(): ComputerBuilder { pc.cpu = "Intel i9"; return this }
    override fun buildRAM(): ComputerBuilder { pc.ram = "32GB DDR5"; return this }
    override fun buildStorage(): ComputerBuilder { pc.storage = "1TB NVMe SSD"; return this }
    override fun buildGPU(): ComputerBuilder { pc.gpu = "NVIDIA RTX 4090"; return this }
    override fun getComputer(): Computer = pc
}
class ComputerDirector {
    fun construct(builder: ComputerBuilder) {
        builder.buildCPU().buildRAM().buildStorage().buildGPU()
    }
}
fun main() {
    val director = ComputerDirector()
    val gamingBuilder = GamingComputerBuilder()
    director.construct(gamingBuilder)
    gamingBuilder.getComputer().display()
}`,
            javascript: `
class Computer {
    constructor() { this.cpu=this.ram=this.storage=this.gpu=null; }
    display() { console.log(\`PC: CPU=\${this.cpu}, RAM=\${this.ram}, Storage=\${this.storage}, GPU=\${this.gpu || 'Integrada'}\`); }
}
class GamingComputerBuilder { // Builder concreto
    constructor() { this.pc = new Computer(); }
    buildCPU() { this.pc.cpu = "Intel i9"; return this; }
    buildRAM() { this.pc.ram = "32GB DDR5"; return this; }
    buildStorage() { this.pc.storage = "1TB NVMe SSD"; return this; }
    buildGPU() { this.pc.gpu = "NVIDIA RTX 4090"; return this; }
    getComputer() { return this.pc; }
}
class ComputerDirector { // Director
    construct(builder) { builder.buildCPU().buildRAM().buildStorage().buildGPU(); }
}
const director = new ComputerDirector();
const gamingBuilder = new GamingComputerBuilder();
director.construct(gamingBuilder);
gamingBuilder.getComputer().display();`
            }
        },
        // --- STRUCTURAL ---
        {
            id: "adapter",
            name: "Adapter (Adaptador)",
            category: "Structural",
            purpose: "Permite que interfaces incompatibles trabajen juntas. Envuelve un objeto existente con una nueva interfaz.",
            analogy: "Un adaptador de corriente para viajes. Tu enchufe de portátil (interfaz A) no encaja en el enchufe de la pared de otro país (interfaz B). El adaptador lo soluciona.",
            whenToUse: "Cuando quieres usar una clase existente, pero su interfaz no coincide con la que necesitas.",
            examples: {
                dart: `
abstract class EuropeanSocket { void plugInEuropean(); } // Target
class USAPowerOutlet { void plugInUSA() => print("Plugged into USA outlet (120V)."); } // Adaptee
class USAtoEuropeanAdapter implements EuropeanSocket { // Adapter
  final USAPowerOutlet _usaOutlet;
  USAtoEuropeanAdapter(this._usaOutlet);
  @override void plugInEuropean() {
    print("Adapter: Converting European plug to USA plug.");
    _usaOutlet.plugInUSA();
  }
}
void main() {
  USAPowerOutlet usaOutlet = USAPowerOutlet();
  EuropeanSocket adapter = USAtoEuropeanAdapter(usaOutlet);
  adapter.plugInEuropean(); // Client usa la interfaz Target
}`,
                python: `
class EuropeanSocket: # Target (conceptual)
    def plug_in_european(self): raise NotImplementedError
class USAPowerOutlet: # Adaptee
    def plug_in_usa(self): print("Plugged into USA outlet (120V).")
class USAtoEuropeanAdapter(EuropeanSocket): # Adapter
    def __init__(self, usa_outlet: USAPowerOutlet): self._usa_outlet = usa_outlet
    def plug_in_european(self):
        print("Adapter: Converting European plug to USA plug.")
        self._usa_outlet.plug_in_usa()

usa_outlet = USAPowerOutlet()
adapter = USAtoEuropeanAdapter(usa_outlet)
adapter.plug_in_european() # Client usa la interfaz Target`,
            kotlin: `
interface EuropeanSocket { fun plugInEuropean() } // Target
class USAPowerOutlet { fun plugInUSA() { println("Plugged into USA outlet (120V).") } } // Adaptee
class USAtoEuropeanAdapter(private val usaOutlet: USAPowerOutlet) : EuropeanSocket { // Adapter
    override fun plugInEuropean() {
        println("Adapter: Converting European plug to USA plug.")
        usaOutlet.plugInUSA()
    }
}
fun main() {
    val usaOutlet = USAPowerOutlet()
    val adapter: EuropeanSocket = USAtoEuropeanAdapter(usaOutlet)
    adapter.plugInEuropean() // Client usa la interfaz Target
}`,
            javascript: `
class USAPowerOutlet { // Adaptee
    plugInUSA() { console.log("Plugged into USA outlet (120V)."); }
}
class USAtoEuropeanAdapter { // Adapter
    constructor(usaOutlet) { this.usaOutlet = usaOutlet; }
    plugInEuropean() { // El método que el cliente espera (Target interface)
        console.log("Adapter: Converting European plug to USA plug.");
        this.usaOutlet.plugInUSA();
    }
}
const usaOutlet = new USAPowerOutlet();
const adapter = new USAtoEuropeanAdapter(usaOutlet);
adapter.plugInEuropean(); // Client usa el adaptador como si fuera la interfaz Target`
            }
        },
        {
            id: "decorator",
            name: "Decorator (Decorador)",
            category: "Structural",
            purpose: "Añade responsabilidades adicionales a un objeto dinámicamente. Los decoradores proporcionan una alternativa flexible a la herencia para extender la funcionalidad.",
            analogy: "Ponerle ingredientes extra a un café. Tienes un café base. Puedes envolverlo con un decorador de leche, luego con un decorador de azúcar. Sigue siendo un café, pero con más cosas.",
            whenToUse: "Para añadir responsabilidades a objetos individuales de forma dinámica y transparente. Cuando la herencia es impráctica.",
            examples: {
                dart: `
abstract class Coffee { String getDescription(); double getCost(); } // Component
class SimpleCoffee implements Coffee { // ConcreteComponent
  @override String getDescription() => "Café simple";
  @override double getCost() => 1.0;
}
abstract class CoffeeDecorator implements Coffee { // Decorator
  final Coffee _decoratedCoffee;
  CoffeeDecorator(this._decoratedCoffee);
  @override String getDescription() => _decoratedCoffee.getDescription();
  @override double getCost() => _decoratedCoffee.getCost();
}
class MilkDecorator extends CoffeeDecorator { // ConcreteDecorator
  MilkDecorator(Coffee coffee) : super(coffee);
  @override String getDescription() => "\${super.getDescription()}, con leche";
  @override double getCost() => super.getCost() + 0.5;
}
void main() {
  Coffee myCoffee = SimpleCoffee();
  myCoffee = MilkDecorator(myCoffee); // Envolver con leche
  print("\${myCoffee.getDescription()} cuesta \$\${myCoffee.getCost()}");
}`,
                python: `
class Coffee: # Component (conceptual)
    def get_description(self): pass; def get_cost(self): pass
class SimpleCoffee(Coffee): # ConcreteComponent
    def get_description(self): return "Café simple"
    def get_cost(self): return 1.0
class CoffeeDecorator(Coffee): # Decorator
    def __init__(self, coffee): self._coffee = coffee
    def get_description(self): return self._coffee.get_description()
    def get_cost(self): return self._coffee.get_cost()
class MilkDecorator(CoffeeDecorator): # ConcreteDecorator
    def get_description(self): return f"{super().get_description()}, con leche"
    def get_cost(self): return super().get_cost() + 0.5

my_coffee = SimpleCoffee()
my_coffee = MilkDecorator(my_coffee) # Envolver
print(f"{my_coffee.get_description()} cuesta ${my_coffee.get_cost()}")`,
            kotlin: `
interface Coffee { fun getDescription(): String; fun getCost(): Double } // Component
class SimpleCoffee : Coffee { // ConcreteComponent
    override fun getDescription(): String = "Café simple"
    override fun getCost(): Double = 1.0
}
abstract class CoffeeDecorator(private val coffee: Coffee) : Coffee { // Decorator
    override fun getDescription(): String = coffee.getDescription()
    override fun getCost(): Double = coffee.getCost()
}
class MilkDecorator(coffee: Coffee) : CoffeeDecorator(coffee) { // ConcreteDecorator
    override fun getDescription(): String = "\${super.getDescription()}, con leche"
    override fun getCost(): Double = super.getCost() + 0.5
}
fun main() {
    var myCoffee: Coffee = SimpleCoffee()
    myCoffee = MilkDecorator(myCoffee) // Envolver
    println("\${myCoffee.getDescription()} cuesta $\${myCoffee.getCost()}")
}`,
            javascript: `
class Coffee { // Component
    getDescription() { return "Café simple"; }
    getCost() { return 1.0; }
}
class MilkDecorator { // Decorator (simplificado, no hereda pero envuelve)
    constructor(coffee) { this.coffee = coffee; }
    getDescription() { return \`\${this.coffee.getDescription()}, con leche\`; }
    getCost() { return this.coffee.getCost() + 0.5; }
}
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee); // Envolver
console.log(\`\${myCoffee.getDescription()} cuesta $\${myCoffee.getCost()}\`);`
            }
        },
         // --- BEHAVIORAL ---
        {
            id: "observer",
            name: "Observer (Observador)",
            category: "Behavioral",
            purpose: "Define una dependencia uno-a-muchos entre objetos, de modo que cuando un objeto (el \"sujeto\") cambia de estado, todos sus dependientes (\"observadores\") son notificados y actualizados automáticamente.",
            analogy: "Una suscripción a una revista. La editorial (Sujeto) publica. Los suscriptores (Observadores) reciben la notificación y la nueva revista.",
            whenToUse: "Cuando un cambio en un objeto requiere cambiar otros, y no sabes cuántos objetos necesitan cambiar.",
            examples: {
                dart: `
abstract class Observer { void update(String message); } // Observer
class NewsAgency { // Subject
  final List<Observer> _observers = [];
  String? _latestNews;
  void addObserver(Observer o) => _observers.add(o);
  void setLatestNews(String news) { _latestNews = news; _notifyObservers(); }
  void _notifyObservers() {
    if (_latestNews != null) { _observers.forEach((o) => o.update(_latestNews!)); }
  }
}
class EmailSubscriber implements Observer { // ConcreteObserver
  final String email; EmailSubscriber(this.email);
  @override void update(String m) => print("Email a $email: '$m'");
}
void main() {
  NewsAgency cnn = NewsAgency();
  EmailSubscriber john = EmailSubscriber("john@example.com");
  cnn.addObserver(john);
  cnn.setLatestNews("¡Mercado sube!"); // John recibe la notificación
}`,
                python: `
class Observer: # Interfaz Observer
    def update(self, message: str): pass
class NewsAgency: # Subject
    def __init__(self): self._observers = []; self._latest_news = None
    def add_observer(self, o: Observer): self._observers.append(o)
    def set_latest_news(self, news: str):
        self._latest_news = news
        self._notify_observers()
    def _notify_observers(self):
        if self._latest_news:
            for o in self._observers: o.update(self._latest_news)
class EmailSubscriber(Observer): # ConcreteObserver
    def __init__(self, email): self.email = email
    def update(self, m): print(f"Email a {self.email}: '{m}'")

cnn = NewsAgency()
john = EmailSubscriber("john@example.com")
cnn.add_observer(john)
cnn.set_latest_news("¡Mercado sube!") # John es notificado`,
            kotlin: `
interface Observer { fun update(message: String) } // Observer
class NewsAgency { // Subject
    private val observers = mutableListOf<Observer>()
    private var latestNews: String? = null
    fun addObserver(o: Observer) { observers.add(o) }
    fun setLatestNews(news: String) { latestNews = news; notifyObservers() }
    private fun notifyObservers() { latestNews?.let { news -> observers.forEach { it.update(news) } } }
}
class EmailSubscriber(private val email: String) : Observer { // ConcreteObserver
    override fun update(message: String) { println("Email a $email: '$message'") }
}
fun main() {
    val cnn = NewsAgency()
    val john = EmailSubscriber("john@example.com")
    cnn.addObserver(john)
    cnn.setLatestNews("¡Mercado sube!") // John es notificado
}`,
            javascript: `
class NewsAgency { // Subject
    constructor() { this.observers = []; this.latestNews = null; }
    addObserver(o) { this.observers.push(o); }
    setLatestNews(news) { this.latestNews = news; this.notifyObservers(); }
    notifyObservers() {
        if (this.latestNews) { this.observers.forEach(o => o.update(this.latestNews)); }
    }
}
class EmailSubscriber { // Observer (con método update)
    constructor(email) { this.email = email; }
    update(m) { console.log(\`Email a \${this.email}: '\${m}'\`); }
}
const cnn = new NewsAgency();
const john = new EmailSubscriber("john@example.com");
cnn.addObserver(john);
cnn.setLatestNews("¡Mercado sube!"); // John es notificado`
            }
        },
        {
            id: "strategy",
            name: "Strategy (Estrategia)",
            category: "Behavioral",
            purpose: "Define una familia de algoritmos, encapsula cada uno y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.",
            analogy: "Diferentes formas de llegar al trabajo: coche, bicicleta, transporte público. Eliges la estrategia según el día.",
            whenToUse: "Cuando tienes muchas clases relacionadas que difieren solo en su comportamiento. Cuando necesitas diferentes variantes de un algoritmo.",
            examples: {
                dart: `
abstract class SortStrategy { List<int> sort(List<int> data); } // Strategy
class BubbleSort implements SortStrategy { // ConcreteStrategy
  @override List<int> sort(List<int> data) { print("Bubble Sort"); return List.from(data)..sort(); }
}
class QuickSort implements SortStrategy { // ConcreteStrategy
  @override List<int> sort(List<int> data) { print("Quick Sort"); return List.from(data)..sort(); }
}
class SortedList { // Context
  SortStrategy _strategy; List<int> _list = [];
  SortedList(this._strategy);
  void setStrategy(SortStrategy s) => _strategy = s;
  void add(int n) => _list.add(n);
  void sortAndDisplay() { _list = _strategy.sort(_list); print(_list); }
}
void main() {
  SortedList records = SortedList(BubbleSort());
  records.add(5); records.add(1); records.sortAndDisplay();
  records.setStrategy(QuickSort()); records.sortAndDisplay();
}`,
                python: `
from abc import ABC, abstractmethod
class SortStrategy(ABC): @abstractmethod def sort(self, data): pass # Strategy
class BubbleSort(SortStrategy): # ConcreteStrategy
    def sort(self, data): print("Bubble Sort"); return sorted(list(data))
class QuickSort(SortStrategy): # ConcreteStrategy
    def sort(self, data): print("Quick Sort"); return sorted(list(data))
class SortedList: # Context
    def __init__(self, strategy): self._strategy=strategy; self._list=[]
    def set_strategy(self, s): self._strategy=s
    def add(self, n): self._list.append(n)
    def sort_and_display(self): self._list=self._strategy.sort(self._list); print(self._list)

records = SortedList(BubbleSort())
records.add(5); records.add(1); records.sort_and_display()
records.set_strategy(QuickSort()); records.sort_and_display()`,
            kotlin: `
interface SortStrategy { fun sort(data: List<Int>): List<Int> } // Strategy
class BubbleSort : SortStrategy { // ConcreteStrategy
    override fun sort(data: List<Int>): List<Int> { println("Bubble Sort"); return data.sorted() }
}
class QuickSort : SortStrategy { // ConcreteStrategy
    override fun sort(data: List<Int>): List<Int> { println("Quick Sort"); return data.sorted() }
}
class SortedList(private var strategy: SortStrategy) { // Context
    private var list = mutableListOf<Int>()
    fun setStrategy(s: SortStrategy) { strategy = s }
    fun add(n: Int) { list.add(n) }
    fun sortAndDisplay() { list = strategy.sort(list).toMutableList(); println(list) }
}
fun main() {
    val records = SortedList(BubbleSort())
    records.add(5); records.add(1); records.sortAndDisplay()
    records.setStrategy(QuickSort()); records.sortAndDisplay()
}`,
            javascript: `
class BubbleSort { sort(data) { console.log("Bubble Sort"); return [...data].sort((a,b)=>a-b); } } // Strategy A
class QuickSort { sort(data) { console.log("Quick Sort"); return [...data].sort((a,b)=>a-b); } } // Strategy B
class SortedList { // Context
    constructor(strategy) { this.strategy=strategy; this.list=[]; }
    setStrategy(s) { this.strategy=s; }
    add(n) { this.list.push(n); }
    sortAndDisplay() { this.list=this.strategy.sort(this.list); console.log(this.list); }
}
const records = new SortedList(new BubbleSort());
records.add(5); records.add(1); records.sortAndDisplay();
records.setStrategy(new QuickSort()); records.sortAndDisplay();`
            }
        }
    ];

    const creationalListEl = document.getElementById('creational-list');
    const structuralListEl = document.getElementById('structural-list');
    const behavioralListEl = document.getElementById('behavioral-list');
    const patternDetailsContainer = document.getElementById('pattern-details');
    const initialContent = patternDetailsContainer.innerHTML;

    function populateNav() {
        designPatterns.forEach(pattern => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${pattern.id}`;
            // Tomar solo el nombre principal antes del paréntesis
            const displayName = pattern.name.includes('(') ? pattern.name.substring(0, pattern.name.indexOf('(')).trim() : pattern.name;
            link.textContent = displayName;
            link.dataset.patternId = pattern.id;

            link.addEventListener('click', (event) => {
                event.preventDefault();
                displayPatternDetails(pattern.id);
                updateActiveLink(link);
                window.location.hash = pattern.id; // Update URL hash
            });
            listItem.appendChild(link);

            if (pattern.category === "Creational") creationalListEl.appendChild(listItem);
            else if (pattern.category === "Structural") structuralListEl.appendChild(listItem);
            else if (pattern.category === "Behavioral") behavioralListEl.appendChild(listItem);
        });
    }

    function updateActiveLink(activeLink) {
        document.querySelectorAll('#patterns-nav a').forEach(a => a.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    function formatLanguageName(langKey) {
        const names = {
            dart: 'Dart',
            python: 'Python',
            kotlin: 'Kotlin',
            javascript: 'JavaScript'
        };
        return names[langKey] || langKey;
    }

    function displayPatternDetails(patternId) {
        const pattern = designPatterns.find(p => p.id === patternId);
        if (!pattern) {
            patternDetailsContainer.innerHTML = initialContent;
            return;
        }

        let examplesHtml = '<div class="code-examples-container">';
        examplesHtml += '<div class="language-tabs">';
        const languages = Object.keys(pattern.examples);

        languages.forEach((lang, index) => {
            examplesHtml += `<button class="tab-button ${index === 0 ? 'active' : ''}" data-lang="${lang}">${formatLanguageName(lang)}</button>`;
        });
        examplesHtml += '</div>'; // Close language-tabs

        languages.forEach((lang, index) => {
            const safeCode = pattern.examples[lang].replace(/</g, "&lt;").replace(/>/g, "&gt;");
            examplesHtml += `
                <div id="code-${pattern.id}-${lang}" class="code-block ${index === 0 ? 'active' : ''}">
                    <pre><code>${safeCode.trim()}</code></pre>
                </div>`;
        });
        examplesHtml += '</div>'; // Close code-examples-container

        patternDetailsContainer.innerHTML = `
            <article>
                <h2>${pattern.name}</h2>
                <p><strong>Categoría:</strong> ${pattern.category}</p>
                ${pattern.purpose ? `<h3>Propósito</h3><p>${pattern.purpose}</p>` : ''}
                ${pattern.analogy ? `<h3>Analogía Sencilla</h3><p>${pattern.analogy}</p>` : ''}
                ${pattern.whenToUse ? `<h3>Cuándo Usarlo</h3><p>${pattern.whenToUse}</p>` : ''}
                <h3>Ejemplos de Código</h3>
                ${examplesHtml}
            </article>`;

        // Add event listeners for the new tabs
        const tabButtons = patternDetailsContainer.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.dataset.lang;
                // Hide all code blocks for this pattern
                patternDetailsContainer.querySelectorAll('.code-block').forEach(block => block.classList.remove('active'));
                // Deactivate all tab buttons for this pattern
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Show selected code block and activate tab
                document.getElementById(`code-${pattern.id}-${lang}`).classList.add('active');
                button.classList.add('active');
            });
        });
        patternDetailsContainer.scrollTop = 0; // Scroll to top of content
    }

    // Initialize navigation
    populateNav();

    // Check for hash on page load
    function loadPatternFromHash() {
        if (window.location.hash) {
            const patternIdFromHash = window.location.hash.substring(1);
            const linkToActivate = document.querySelector(`#patterns-nav a[data-pattern-id="${patternIdFromHash}"]`);
            if (linkToActivate) {
                displayPatternDetails(patternIdFromHash);
                updateActiveLink(linkToActivate);
            } else {
                 patternDetailsContainer.innerHTML = initialContent; // Reset if hash is invalid
                 updateActiveLink(null);
            }
        } else {
            patternDetailsContainer.innerHTML = initialContent; // Default view
            updateActiveLink(null);
        }
    }

    // Load content based on hash or default
    loadPatternFromHash();

    // Listen for hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', loadPatternFromHash);
});