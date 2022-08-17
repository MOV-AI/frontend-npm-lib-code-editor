export default {
  scopes: {
    label: "scopes",
    detail:
      "\n    A scopes tree is an interface to access the stored\n    data in mov.ai\n    ",
    kind: "variable",
    methods: [
      {
        label: "__call__",
        detail:
          "\n        this access the workspaces on this scope tree, if the workspace is not loaded yet,\n        it will be automatically loaded, for now we just support one workspace (global) in redis,\n        the other workspaces will be automatically mapped to use the filesystem plugin\n        ",
      },
      {
        label: "__class__",
        detail:
          "\n    A scopes tree is an interface to access the stored\n    data in mov.ai\n    ",
      },
      {
        label: "__delattr__",
        detail: "Implement delattr(self, name).",
      },
      {
        label: "__dir__",
        detail: "__dir__() -> list\ndefault dir() implementation",
      },
      {
        label: "__eq__",
        detail: null,
      },
      {
        label: "__format__",
        detail: "default object formatter",
      },
      {
        label: "__ge__",
        detail: "Return self>=value.",
      },
      {
        label: "__getattr__",
        detail: null,
      },
      {
        label: "__getattribute__",
        detail: "Return getattr(self, name).",
      },
      {
        label: "__getitem__",
        detail: null,
      },
      {
        label: "__gt__",
        detail: "Return self>value.",
      },
      {
        label: "__init__",
        detail: null,
      },
      {
        label: "__init_subclass__",
        detail:
          "This method is called when a class is subclassed.\n\nThe default implementation does nothing. It may be\noverridden to extend subclasses.\n",
      },
      {
        label: "__iter__",
        detail: null,
      },
      {
        label: "__le__",
        detail: "Return self<=value.",
      },
      {
        label: "__lt__",
        detail: "Return self<value.",
      },
      {
        label: "__ne__",
        detail: "Return self!=value.",
      },
      {
        label: "__new__",
        detail:
          "Create and return a new object.  See help(type) for accurate signature.",
      },
      {
        label: "__reduce__",
        detail: "helper for pickle",
      },
      {
        label: "__reduce_ex__",
        detail: "helper for pickle",
      },
      {
        label: "__repr__",
        detail: "Return repr(self).",
      },
      {
        label: "__setattr__",
        detail: null,
      },
      {
        label: "__setitem__",
        detail: null,
      },
      {
        label: "__sizeof__",
        detail: "__sizeof__() -> int\nsize of object in memory, in bytes",
      },
      {
        label: "__str__",
        detail: null,
      },
      {
        label: "__subclasshook__",
        detail:
          "Abstract classes can override this to customize issubclass().\n\nThis is invoked early on by abc.ABCMeta.__subclasscheck__().\nIt should return True, False or NotImplemented.  If it returns\nNotImplemented, the normal algorithm is used.  Otherwise, it\noverrides the normal algorithm (and the outcome is cached).\n",
      },
      {
        label: "_tree_node_sort",
        detail: null,
      },
      {
        label: "add_child",
        detail: "\n        add a ne child to this node\n        ",
      },
      {
        label: "backup",
        detail: "\n        Read a document from a specified path\n        ",
      },
      {
        label: "cached_attribute",
        detail:
          "\n        A decorator to set use the self.attributes as\n        a cache, when using this decorator the property\n        will be cached on the attributes of this node\n        ",
      },
      {
        label: "contains",
        detail: "\n        check if dict contains key\n        ",
      },
      {
        label: "extract_reference",
        detail:
          "\n        Convert a path into workspace, scope, ref, version\n        ",
      },
      {
        label: "from_path",
        detail: "\n        Read a document from a specified path\n        ",
      },
      {
        label: "get",
        detail: "\n        return the value of the element with key\n        ",
      },
      {
        label: "get_first_parent",
        detail: "\n        get the first parent of type node_type:\n        ",
      },
      {
        label: "items",
        detail: "\n        access to this dict item\n        ",
      },
      {
        label: "keys",
        detail: "\n        access to this dict keys\n        ",
      },
      {
        label: "read_from_path",
        detail: "\n        Read a document from a specified path\n        ",
      },
      {
        label: "remove_child",
        detail: "\n        remove child to this node\n        ",
      },
      {
        label: "restore",
        detail: "\n        Read a document from a specified path\n        ",
      },
      {
        label: "sort",
        detail: null,
      },
      {
        label: "to_path",
        detail: "\n        get a path representation of this Node\n        ",
      },
      {
        label: "values",
        detail: "\n        acess to this dict values\n        ",
      },
    ],
  },
  Model: {
    label: "Model",
    detail:
      '\n    The base class of a model in mov.ai, a model is an\n    entity with 2 parts defined, the attributes are\n    through a schema and methods are python classes\n    implementation.\n\n    This class support relations, for that the model\n    class must provide a class attribute called\n    __RELATIONS__, this attribute is a dictonary with\n    the following structure:\n    {\n        "schemas/<schema version>/<scope>/<attr>" : {\n            "schema_version" : <target schema version>,\n            "scope" : <target scope>\n        }\n    }\n    ',
    kind: "class",
  },
  Flow: {
    label: "Flow",
    detail: "\n    A Flow\n    ",
    kind: "class",
  },
  Node: {
    label: "Node",
    detail:
      "\n    Provides the default configuration to launch a GD_Node\n    ",
    kind: "class",
  },
  NodeInst: {
    label: "NodeInst",
    detail: "\n    A node instance\n    ",
    kind: "class",
  },
  Container: {
    label: "Container",
    detail:
      "\n    A container represents a flow in another flow (aka subflow)\n    ",
    kind: "class",
  },
  Configuration: {
    label: "Configuration",
    detail: "\n    Provides xml or yaml configuration\n    ",
    kind: "class",
  },
  SharedDataEntry: {
    label: "SharedDataEntry",
    detail: " SharedDataEntry Model ",
    kind: "class",
  },
  SharedDataTemplate: {
    label: "SharedDataTemplate",
    detail: " SharedDataTemplate Model ",
    kind: "class",
  },
  TaskTemplate: {
    label: "TaskTemplate",
    detail: " TaskTemplate Model ",
    kind: "class",
  },
  TaskEntry: {
    label: "TaskEntry",
    detail: " TaskEntry Model ",
    kind: "class",
  },
  Annotation: {
    label: "Annotation",
    detail: " Annotation Model ",
    kind: "class",
  },
  Application: {
    label: "Application",
    detail: " Application Model ",
    kind: "class",
  },
  Form: {
    label: "Form",
    detail: " Form Model ",
    kind: "class",
  },
  GraphicAsset: {
    label: "GraphicAsset",
    detail: " GraphicAsset Model ",
    kind: "class",
  },
  Layout: {
    label: "Layout",
    detail: " Layout Model ",
    kind: "class",
  },
  Widget: {
    label: "Widget",
    detail: " Widget Model ",
    kind: "class",
  },
  User: {
    label: "User",
    detail:
      "This class represents the user object as record in the DB,\n    it handles all operations required for user: authentication,\n    token generation and so..\n    ",
    kind: "class",
  },
  Role: {
    label: "Role",
    detail: " Role Model (only of name) ",
    kind: "class",
  },
  Callback: {
    label: "Callback",
    detail: "Callback Model",
    kind: "class",
  },
  GraphicScene: {
    label: "GraphicScene",
    detail: " GraphicScene Model ",
    kind: "class",
  },
  AclObject: {
    label: "AclObject",
    detail:
      'This class represents an access list for remote users.\n    Each record in the access list is actually a user that is allowed\n    to login.\n    The name of each record is in the form "account_name@domain_name".\n    ',
    kind: "class",
  },
  LdapConfig: {
    label: "LdapConfig",
    detail:
      "This class represents an ldap configuration saved in the DB.\n    The name of the configuratin will be the same as the domain",
    kind: "class",
  },
  RemoteUser: {
    label: "RemoteUser",
    detail: null,
    kind: "class",
  },
  Package: {
    label: "Package",
    detail: "Package class deals with packages/files uploaded to the db",
    kind: "class",
  },
  Message: {
    label: "Message",
    detail: "Message class",
    kind: "class",
  },
  Ports: {
    label: "Ports",
    detail: "Ports model",
    kind: "class",
  },
  Task: {
    label: "Task",
    detail:
      " Manage tasks for the robots\n        - Default queue is 'System:Task,Queue:Main' (redis sorted set)\n        - Add a task with Task.create\n            - Custom queues can be created by providing queue parameter when adding a task\n        - Get a task by calling Task.get\n            - Call it with a queue name to get a task from a specific queue\n        - When a robot gets a task it should call obj.start and obj.finish\n    ",
    kind: "class",
  },
  StateMachine: {
    label: "StateMachine",
    detail: "StateMachine class",
    kind: "class",
  },
  Var: {
    label: "Var",
    detail: "Class for user to set and get vars",
    kind: "class",
  },
  Robot: {
    label: "Robot",
    detail: "Robot class that deals with robot related stuff",
    kind: "variable",
    methods: [
      {
        label: "__class__",
        detail: "Robot class that deals with robot related stuff",
      },
      {
        label: "__delattr__",
        detail: null,
      },
      {
        label: "__dir__",
        detail: "__dir__() -> list\ndefault dir() implementation",
      },
      {
        label: "__eq__",
        detail: "Return self==value.",
      },
      {
        label: "__format__",
        detail: "default object formatter",
      },
      {
        label: "__ge__",
        detail: "Return self>=value.",
      },
      {
        label: "__getattr__",
        detail: null,
      },
      {
        label: "__getattribute__",
        detail: null,
      },
      {
        label: "__gt__",
        detail: "Return self>value.",
      },
      {
        label: "__hash__",
        detail: "Return hash(self).",
      },
      {
        label: "__init__",
        detail: null,
      },
      {
        label: "__init_subclass__",
        detail:
          "This method is called when a class is subclassed.\n\nThe default implementation does nothing. It may be\noverridden to extend subclasses.\n",
      },
      {
        label: "__le__",
        detail: "Return self<=value.",
      },
      {
        label: "__lt__",
        detail: "Return self<value.",
      },
      {
        label: "__ne__",
        detail: "Return self!=value.",
      },
      {
        label: "__new__",
        detail:
          "Create and return a new object.  See help(type) for accurate signature.",
      },
      {
        label: "__reduce__",
        detail: "helper for pickle",
      },
      {
        label: "__reduce_ex__",
        detail: "helper for pickle",
      },
      {
        label: "__repr__",
        detail: "Return repr(self).",
      },
      {
        label: "__setattr__",
        detail: null,
      },
      {
        label: "__sizeof__",
        detail: "__sizeof__() -> int\nsize of object in memory, in bytes",
      },
      {
        label: "__str__",
        detail: "Return str(self).",
      },
      {
        label: "__subclasshook__",
        detail:
          "Abstract classes can override this to customize issubclass().\n\nThis is invoked early on by abc.ABCMeta.__subclasscheck__().\nIt should return True, False or NotImplemented.  If it returns\nNotImplemented, the normal algorithm is used.  Otherwise, it\noverrides the normal algorithm (and the outcome is cached).\n",
      },
      {
        label: "add",
        detail: null,
      },
      {
        label: "calc_scope_update",
        detail:
          " Calc the objects differences and returns list with dict keys to delete/set ",
      },
      {
        label: "cls_update_status",
        detail:
          " Class method to update the Robot status in the database\n        This method reduces readings from the database compared to using Robot instance\n        ",
      },
      {
        label: "delete",
        detail: null,
      },
      {
        label: "get_all",
        detail: null,
      },
      {
        label: "get_attributes",
        detail: null,
      },
      {
        label: "get_dict",
        detail: " Returns the full dictionary of the scope from db",
      },
      {
        label: "get_ref",
        detail:
          "Receives a value and returns the value with refs if they exist",
      },
      {
        label: "get_states",
        detail:
          "Gets the states of the robot from its own configuration.\n        When Robot groups are implemented it should merge with the group configuration",
      },
      {
        label: "get_value",
        detail: null,
      },
      {
        label: "has_scope_permission",
        detail: null,
      },
      {
        label: "remove",
        detail: " Removes Scope ",
      },
      {
        label: "remove_partial",
        detail: " Remove Scope key ",
      },
      {
        label: "rename",
        detail: null,
      },
      {
        label: "send_cmd",
        detail: "Send an action command to the Robot",
      },
      {
        label: "set_ip",
        detail: "Set the IP Adress of the Robot",
      },
      {
        label: "set_name",
        detail: "Set the Name of the Robot",
      },
      {
        label: "set_param",
        detail: "Sets or updates a parameter of the robots",
      },
      {
        label: "update_status",
        detail: "Update the Robot status in the database",
      },
    ],
  },
  FleetRobot: {
    label: "FleetRobot",
    detail: null,
    kind: "class",
  },
  logger: {
    label: "logger",
    detail: null,
    kind: "variable",
    methods: [
      {
        label: "__class__",
        detail: null,
      },
      {
        label: "__delattr__",
        detail: "Implement delattr(self, name).",
      },
      {
        label: "__dir__",
        detail: "__dir__() -> list\ndefault dir() implementation",
      },
      {
        label: "__eq__",
        detail: "Return self==value.",
      },
      {
        label: "__format__",
        detail: "default object formatter",
      },
      {
        label: "__ge__",
        detail: "Return self>=value.",
      },
      {
        label: "__getattribute__",
        detail: "Return getattr(self, name).",
      },
      {
        label: "__gt__",
        detail: "Return self>value.",
      },
      {
        label: "__hash__",
        detail: "Return hash(self).",
      },
      {
        label: "__init__",
        detail: "\n        Logger\n        ",
      },
      {
        label: "__init_subclass__",
        detail:
          "This method is called when a class is subclassed.\n\nThe default implementation does nothing. It may be\noverridden to extend subclasses.\n",
      },
      {
        label: "__le__",
        detail: "Return self<=value.",
      },
      {
        label: "__lt__",
        detail: "Return self<value.",
      },
      {
        label: "__ne__",
        detail: "Return self!=value.",
      },
      {
        label: "__new__",
        detail:
          "Create and return a new object.  See help(type) for accurate signature.",
      },
      {
        label: "__reduce__",
        detail: "helper for pickle",
      },
      {
        label: "__reduce_ex__",
        detail: "helper for pickle",
      },
      {
        label: "__repr__",
        detail: "Return repr(self).",
      },
      {
        label: "__setattr__",
        detail: "Implement setattr(self, name, value).",
      },
      {
        label: "__sizeof__",
        detail: "__sizeof__() -> int\nsize of object in memory, in bytes",
      },
      {
        label: "__str__",
        detail: "Return str(self).",
      },
      {
        label: "__subclasshook__",
        detail:
          "Abstract classes can override this to customize issubclass().\n\nThis is invoked early on by abc.ABCMeta.__subclasscheck__().\nIt should return True, False or NotImplemented.  If it returns\nNotImplemented, the normal algorithm is used.  Otherwise, it\noverrides the normal algorithm (and the outcome is cached).\n",
      },
      {
        label: "_exc_tb",
        detail: null,
      },
      {
        label: "_filter_data",
        detail: null,
      },
      {
        label: "_find_between",
        detail: null,
      },
      {
        label: "_find_frame_info",
        detail: null,
      },
      {
        label: "_log",
        detail: null,
      },
      {
        label: "critical",
        detail: null,
      },
      {
        label: "debug",
        detail: null,
      },
      {
        label: "error",
        detail: null,
      },
      {
        label: "get_logs",
        detail: " Get logs from HealthNode ",
      },
      {
        label: "info",
        detail: null,
      },
      {
        label: "validate_datetime",
        detail: " Validate if value is timestamp or datetime ",
      },
      {
        label: "validate_level",
        detail: null,
      },
      {
        label: "validate_limit",
        detail: null,
      },
      {
        label: "validate_message",
        detail: null,
      },
      {
        label: "validate_str_list",
        detail: null,
      },
      {
        label: "warn",
        detail: null,
      },
      {
        label: "warning",
        detail: null,
      },
    ],
  },
  metrics: {
    label: "metrics",
    detail: null,
    kind: "variable",
    methods: [
      {
        label: "__class__",
        detail: null,
      },
      {
        label: "__delattr__",
        detail: "Implement delattr(self, name).",
      },
      {
        label: "__dir__",
        detail: "__dir__() -> list\ndefault dir() implementation",
      },
      {
        label: "__eq__",
        detail: "Return self==value.",
      },
      {
        label: "__format__",
        detail: "default object formatter",
      },
      {
        label: "__ge__",
        detail: "Return self>=value.",
      },
      {
        label: "__getattribute__",
        detail: "Return getattr(self, name).",
      },
      {
        label: "__gt__",
        detail: "Return self>value.",
      },
      {
        label: "__hash__",
        detail: "Return hash(self).",
      },
      {
        label: "__init__",
        detail: "\n        Metrics\n        ",
      },
      {
        label: "__init_subclass__",
        detail:
          "This method is called when a class is subclassed.\n\nThe default implementation does nothing. It may be\noverridden to extend subclasses.\n",
      },
      {
        label: "__le__",
        detail: "Return self<=value.",
      },
      {
        label: "__lt__",
        detail: "Return self<value.",
      },
      {
        label: "__ne__",
        detail: "Return self!=value.",
      },
      {
        label: "__new__",
        detail:
          "Create and return a new object.  See help(type) for accurate signature.",
      },
      {
        label: "__reduce__",
        detail: "helper for pickle",
      },
      {
        label: "__reduce_ex__",
        detail: "helper for pickle",
      },
      {
        label: "__repr__",
        detail: "Return repr(self).",
      },
      {
        label: "__setattr__",
        detail: "Implement setattr(self, name, value).",
      },
      {
        label: "__sizeof__",
        detail: "__sizeof__() -> int\nsize of object in memory, in bytes",
      },
      {
        label: "__str__",
        detail: "Return str(self).",
      },
      {
        label: "__subclasshook__",
        detail:
          "Abstract classes can override this to customize issubclass().\n\nThis is invoked early on by abc.ABCMeta.__subclasscheck__().\nIt should return True, False or NotImplemented.  If it returns\nNotImplemented, the normal algorithm is used.  Otherwise, it\noverrides the normal algorithm (and the outcome is cached).\n",
      },
      {
        label: "_filter_data",
        detail: null,
      },
      {
        label: "_find_between",
        detail: null,
      },
      {
        label: "_log",
        detail: " Add Log ",
      },
      {
        label: "add",
        detail: null,
      },
      {
        label: "get_metrics",
        detail: " Get Metrics from HealthNode ",
      },
      {
        label: "validate_fields",
        detail: null,
      },
      {
        label: "validate_limit",
        detail: null,
      },
      {
        label: "validate_message",
        detail: null,
      },
      {
        label: "validate_name",
        detail: null,
      },
    ],
  },
  PortName: {
    label: "PortName",
    detail: "Constant of value ",
    kind: "variable",
  },
  SM: {
    label: "SM",
    detail: "Class for user to set and get state machine vars",
    kind: "class",
  },
  Lock: {
    label: "Lock",
    detail: "Class for user to use locks",
    kind: "class",
  },
  print: {
    label: "print",
    detail: "Method to redirect the print function into logger",
    kind: "function",
  },
  Scene: {
    label: "Scene",
    detail: "",
    kind: "variable",
  },
};
