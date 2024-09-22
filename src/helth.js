import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
const HealthcareServicesApp = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    // Load services from localStorage on component mount
    const storedServices =
      JSON.parse(localStorage.getItem("healthcareServices")) || [];
    setServices(storedServices);
  }, []);

  useEffect(() => {
    // Save services to localStorage whenever the services state changes
    localStorage.setItem("healthcareServices", JSON.stringify(services));
  }, [services]);

  const addService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description && newService.price) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: "", description: "", price: "" });
    }
  };

  const updateService = (e) => {
    e.preventDefault();
    if (
      editingService.name &&
      editingService.description &&
      editingService.price
    ) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? editingService : service
        )
      );
      setEditingService(null);
    }
  };

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-5 text-lime-700 ">
        Healthcare Services Management
      </h1>

      <Card className="mb-4 ">
        <CardHeader>
          <h2 className="text-xl font-semibold">
            {editingService ? "Update Service" : "Add New Service"}
          </h2>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={editingService ? updateService : addService}
            className="space-y-4"
          >
            <Input
              type="text"
              placeholder="Service Name"
              value={editingService ? editingService.name : newService.name}
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  : setNewService({ ...newService, name: e.target.value })
              }
              required
            />
            <Textarea
              placeholder="Description"
              value={
                editingService
                  ? editingService.description
                  : newService.description
              }
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  : setNewService({
                      ...newService,
                      description: e.target.value,
                    })
              }
              required
            />
            <Input
              type="number"
              placeholder="Price"
              value={editingService ? editingService.price : newService.price}
              onChange={(e) =>
                editingService
                  ? setEditingService({
                      ...editingService,
                      price: e.target.value,
                    })
                  : setNewService({ ...newService, price: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              className={`${
                editingService ? "bg-blue-500" : "bg-green-500"
              } text-white hover:bg-opacity-90 px-4 py-2 rounded-lg`}
            >
              {editingService ? "Update Service" : "Add Service"}
            </Button>
            {editingService && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingService(null)}
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2 text-lime-700">Services List</h2>
      {services.map((service) => (
    <Card key={service.id} className="mb-6 bg-white shadow-lg rounded-lg overflow-hidden">
    <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
      <div className="w-full sm:w-2/3">
        <h3 className="text-xl font-bold text-gray-800 text-left">{service.name}</h3>
        <p className="text-gray-600 mb-2 text-left">{service.description}</p>
        <p className="text-xl font-bold text-green-500 text-left">${service.price}</p>
      </div>
      <div className="w-full sm:w-auto flex space-x-3 justify-start sm:justify-end">
        <Button
          onClick={() => setEditingService(service)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete the service: ${service.name}?`)) {
              deleteService(service.id);
            }
          }}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
  
      
      ))}
    </div>
  );
};

export default HealthcareServicesApp;
