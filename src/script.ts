class Person {
  private personName: { [key: string]: string } = {}; //in vanilla js private variables/methods are marked with #

  public setPrefix(prefix: string) {
    this.personName["prefix"] = prefix;
  }

  public getPrefix() {
    return this.personName["prefix"];
  }

  public setGivenName(givenName: string) {
    this.personName["givenName"] = givenName;
  }

  public getGivenName() {
    return this.personName["givenName"];
  }
}

interface PersonProvider {
  getPerson(persons: Array<Person>, givenName: string): Person;
  filterPrefix(persons: Array<Person>, prefix: string): Array<Person>;
}

class LocatorPersonProvider implements PersonProvider {
  public getPerson(persons: Array<Person>, givenName: string): any {
    return persons.find((person) => person.getGivenName() === givenName);
  }
  public filterPrefix(persons: Array<Person>, prefix: string): Array<Person> {
    return persons.filter((person) => person.getPrefix() === prefix);
  }
}

class PersonProviderFactory {
  public static createProvider(type: string) {
    if (type === "manual") {
      return new LocatorPersonProvider();
    } else {
      return null;
    }
  }
}

const person = new Person();
person.setPrefix("Mr.");
person.setGivenName("John");
const person1 = new Person();
person1.setPrefix("Ms.");
person1.setGivenName("Jane");
const person2 = new Person();
person2.setPrefix("Ms.");
person2.setGivenName("Valery");
const person3 = new Person();
person3.setPrefix("Mr.");
person3.setGivenName("Vincent");
const person4 = new Person();
person4.setPrefix("Mx.");
person4.setGivenName("Charlie");
const persons = [person, person1, person2, person3, person4];

const config = "nu";
/* I need to get person data... */
const provider = PersonProviderFactory.createProvider(config);
if (provider == null) {
  console.log("Provider is null");
  process.exit(0);
}

const personJohn = provider.getPerson(persons, "John");
const personsMs = provider.filterPrefix(persons, "Ms.");

console.log(personJohn.getPrefix() + personJohn.getGivenName());
console.log("Ms(s):");
personsMs.forEach((personMs) => {
  console.log(personMs.getPrefix() + personMs.getGivenName());
});
