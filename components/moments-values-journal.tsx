'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Heart, Sparkles, Upload, Shuffle, Search, X, Calendar, Smile, ChevronRight, Edit } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

// Define types for our data structures
interface Value {
  id: string
  name: string
  icon: string
  color: string
  description: string
  image: string
  category: string
  timestamp: number
  questions: string[]
}

interface Moment {
  id: string
  title: string
  description: string
  reflection: string
  imageUrl: string
  values: string[]
  timestamp: number
  mood: number
}

// Initial core values
const initialCoreValues: Value[] = [
  {
    id: '1',
    name: 'Growth',
    icon: '🌱',
    color: 'bg-green-500',
    description: 'Embracing continuous learning and personal development.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Personal Development',
    timestamp: Date.now(),
    questions: [
      "How have you challenged yourself to grow today?",
      "What new skill or knowledge did you acquire recently?",
      "In what ways are you pushing yourself out of your comfort zone?"
    ]
  },
  {
    id: '2',
    name: 'Connection',
    icon: '🤝',
    color: 'bg-blue-500',
    description: 'Building and nurturing meaningful relationships.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Relationships',
    timestamp: Date.now(),
    questions: [
      "How did you strengthen a relationship today?",
      "What meaningful conversation did you have recently?",
      "In what ways are you fostering a sense of community?"
    ]
  },
  {
    id: '3',
    name: 'Creativity',
    icon: '🎨',
    color: 'bg-purple-500',
    description: 'Expressing yourself authentically through various forms of creation and innovation.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Expression',
    timestamp: Date.now(),
    questions: [
      "How did you express your creativity today?",
      "What new ideas have you been exploring?",
      "What creative projects are you excited about?"
    ]
  },
  {
    id: '4',
    name: 'Adventure',
    icon: '🌎',
    color: 'bg-orange-500',
    description: 'Seeking new experiences and embracing the unknown with courage and excitement.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Experience',
    timestamp: Date.now(),
    questions: [
      "What new experience did you try recently?",
      "How did you step out of your comfort zone?",
      "What adventure are you looking forward to?"
    ]
  },
  {
    id: '5',
    name: 'Wisdom',
    icon: '🦉',
    color: 'bg-amber-500',
    description: 'Developing deep understanding and insight through experience and reflection.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Knowledge',
    timestamp: Date.now(),
    questions: [
      "What wisdom have you gained recently?",
      "How have you applied your knowledge to real-world situations?",
      "What wisdom are you seeking next?"
    ]
  },
  {
    id: '6',
    name: 'Balance',
    icon: '☯️',
    color: 'bg-teal-500',
    description: 'Finding harmony between different aspects of life and maintaining equilibrium.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Lifestyle',
    timestamp: Date.now(),
    questions: [
      "How have you achieved balance in your life?",
      "What aspects of your life are out of balance?",
      "How can you improve your balance?"
    ]
  },
  {
    id: '7',
    name: 'Compassion',
    icon: '💗',
    color: 'bg-rose-500',
    description: 'Showing kindness and empathy towards others and yourself.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Relationships',
    timestamp: Date.now(),
    questions: [
      "How have you shown compassion towards others?",
      "How have you shown compassion towards yourself?",
      "How can you improve your compassion?"
    ]
  },
  {
    id: '8',
    name: 'Freedom',
    icon: '🕊️',
    color: 'bg-sky-500',
    description: 'Living authentically and having the autonomy to make meaningful choices.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Personal Development',
    timestamp: Date.now(),
    questions: [
      "How have you lived authentically?",
      "What choices have you made that align with your values?",
      "How can you increase your autonomy?"
    ]
  },
  {
    id: '9',
    name: 'Impact',
    icon: '🌟',
    color: 'bg-indigo-500',
    description: 'Making a positive difference in the world and leaving a meaningful legacy.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Purpose',
    timestamp: Date.now(),
    questions: [
      "What positive impact have you made in the world?",
      "How can you increase your impact?",
      "What legacy are you aiming to leave?"
    ]
  },
  {
    id: '10',
    name: 'Resilience',
    icon: '🌳',
    color: 'bg-emerald-500',
    description: 'Bouncing back from challenges and growing stronger through adversity.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Personal Development',
    timestamp: Date.now(),
    questions: [
      "How have you bounced back from challenges?",
      "What adversity have you faced recently?",
      "How can you grow stronger through adversity?"
    ]
  },
  {
    id: '11',
    name: 'Joy',
    icon: '✨',
    color: 'bg-yellow-500',
    description: 'Finding and creating moments of happiness and celebration in daily life.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Emotion',
    timestamp: Date.now(),
    questions: [
      "What moments of joy have you experienced recently?",
      "How have you created moments of joy?",
      "What joy are you seeking next?"
    ]
  },
  {
    id: '12',
    name: 'Authenticity',
    icon: '🎭',
    color: 'bg-violet-500',
    description: 'Being true to yourself and living in alignment with your values.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Personal Development',
    timestamp: Date.now(),
    questions: [
      "How have you lived authentically?",
      "What values do you live by?",
      "How can you improve your authenticity?"
    ]
  }

  // Add more initial values here...
];

interface ValueCardProps {
  value: Value;
  onClick: () => void;
  onImageUpload: (id: string, image: File) => void;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, onClick, onImageUpload }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="group relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={value.image} 
            alt={value.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        </div>
        <CardContent className="relative p-4 sm:p-6 flex flex-col items-center justify-end min-h-[150px] sm:min-h-[200px]">
          <span className="text-2xl sm:text-3xl mb-2">{value.icon}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white text-center">{value.name}</h3>
          <span className="text-xs sm:text-sm text-white/80">{value.category}</span>
        </CardContent>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Label htmlFor={`image-upload-${value.id}`} className="cursor-pointer">
            <Upload className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </Label>
          <Input
            id={`image-upload-${value.id}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImageUpload(value.id, file);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Card>
    </motion.div>
  );
};

interface MomentCardProps {
  moment: Moment;
  onEdit: (moment: Moment) => void;
  values: Value[];
}

const MomentCard: React.FC<MomentCardProps> = ({ moment, onEdit, values }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsOpen(true)}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={moment.imageUrl} 
          alt={moment.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg sm:text-xl truncate">{moment.title}</CardTitle>
        <CardDescription className="text-sm">{new Date(moment.timestamp).toLocaleDateString()}</CardDescription>
      </CardHeader>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{moment.title}</DialogTitle>
            <DialogDescription>
              {new Date(moment.timestamp).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <img src={moment.imageUrl} alt={moment.title} className="w-full h-48 object-cover rounded-md" />
            <p className="text-sm text-gray-600">{moment.description}</p>
            <p className="text-sm italic text-gray-500">{moment.reflection}</p>
            <div className="flex flex-wrap gap-2">
              {moment.values.map((valueId) => {
                const value = values.find(v => v.id === valueId);
                return value ? (
                  <span key={valueId} className={`px-2 py-1 rounded-full text-xs text-white ${value.color}`}>
                    {value.name}
                  </span>
                ) : null;
              })}
            </div>
            <div className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-yellow-500" />
              <Progress value={moment.mood * 20} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onEdit(moment)}>Edit</Button>
          </DialogFooter>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default function MomentsValuesJournal() {
  const [showSplash, setShowSplash] = useState(true)
  const [values, setValues] = useState<Value[]>(initialCoreValues)
  const [moments, setMoments] = useState<Moment[]>([])
  const [showNewMomentDialog, setShowNewMomentDialog] = useState(false)
  const [showNewValueDialog, setShowNewValueDialog] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Value | null>(null)
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null);
  const [editingValue, setEditingValue] = useState<Value | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showGuidedReflection, setShowGuidedReflection] = useState(false);
  const [reflectionStep, setReflectionStep] = useState(0);

  // Get unique categories
  const categories = Array.from(new Set(values.map(value => value.category)));

  // Filter values based on search and category
  const filteredValues = values.filter(value => {
    const matchesSearch = value.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         value.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || value.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a server and get back a URL
      const imageUrl = URL.createObjectURL(file)
      return imageUrl
    }
    return null
  }

  // Function to add or edit a moment
  const addOrEditMoment = async (data: { title: string; description: string; reflection: string; image: File | null; values: string[]; mood: number }) => {
    let imageUrl = data.image ? await handleImageUpload({ target: { files: [data.image] } } as any) : '';

    if (!imageUrl && editingMoment) {
      imageUrl = editingMoment.imageUrl; // Keep the existing image if no new one is uploaded
    }

    const newMoment: Moment = {
      id: editingMoment ? editingMoment.id : Date.now().toString(),
      title: data.title,
      description: data.description,
      reflection: data.reflection,
      imageUrl: imageUrl || '/placeholder.svg?height=200&width=200',
      values: data.values,
      timestamp: editingMoment ? editingMoment.timestamp : Date.now(),
      mood: data.mood,
    };

    if (editingMoment) {
      setMoments(moments.map(m => m.id === editingMoment.id ? newMoment : m));
      toast({
        title: "Moment updated",
        description: "Your moment has been successfully updated.",
      })
    } else {
      setMoments([newMoment, ...moments]);
      toast({
        title: "Moment added",
        description: "Your new moment has been successfully added.",
      })
    }
    setEditingMoment(null);
    setShowNewMomentDialog(false);
  };

  // Function to add or edit a value
  const addOrEditValue = async (data: { name: string; description: string; category: string; image: File | null; questions: string[] }) => {
    const imageUrl = data.image ? await handleImageUpload({ target: { files: [data.image] } } as any) : '';
    const newValue: Value = {
      id: editingValue ? editingValue.id : Date.now().toString(),
      name: data.name,
      icon: '✨', // You could implement a proper icon selector
      color: `bg-${['blue', 'green', 'purple', 'pink', 'yellow'][Math.floor(Math.random() * 5)]}-500`,
      description: data.description,
      image: imageUrl || (editingValue ? editingValue.image : '/placeholder.svg?height=400&width=600'),
      category: data.category,
      timestamp: editingValue ? editingValue.timestamp : Date.now(),
      questions: data.questions,
    }
    
    if (editingValue) {
      setValues(values.map(v => v.id === editingValue.id ? newValue : v));
      toast({
        title: "Value updated",
        description: "Your value has been successfully updated.",
      })
    } else {
      setValues([...values, newValue]);
      toast({
        title: "Value added",
        description: "Your new value has been successfully added.",
      })
    }
    setEditingValue(null);
    setShowNewValueDialog(false);
  }

  // Function to update value image
  const updateValueImage = async (id: string, image: File) => {
    const imageUrl = await handleImageUpload({ target: { files: [image] } } as any);
    setValues(values.map(value => 
      value.id === id ? { ...value, image: imageUrl || value.image } : value
    ));
    toast({
      title: "Image updated",
      description: "The value image has been successfully updated.",
    })
  }

  // Function to get a random value for reflection
  const getRandomValue = () => {
    const randomIndex = Math.floor(Math.random() * values.length)
    setSelectedValue(values[randomIndex])
  }

  const handleEditMoment = (moment: Moment) => {
    setEditingMoment(moment);
    setShowNewMomentDialog(true);
  };

  const handleEditValue = (value: Value) => {
    setEditingValue(value);
    setShowNewValueDialog(true);
  };

  if (showSplash) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-full h-full text-white" />
        </motion.div>
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white  text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Moments & Values
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-white mb-6 sm:mb-8 text-center max-w-md"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Discover what matters most through your meaningful moments
        </motion.p>
        <motion.button
          className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-purple-600 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-purple-50 transition duration-300"
          onClick={() => setShowSplash(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <Tabs defaultValue="moments" className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4 md:mb-0">Moments & Values</h1>
          <TabsList className="bg-white">
            <TabsTrigger value="moments">Moments</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="moments">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Add New Moment Card */}
            <Dialog open={showNewMomentDialog} onOpenChange={(open) => {
              setShowNewMomentDialog(open);
              if (!open) {
                setEditingMoment(null);
                setSelectedValue(null);
              }
            }}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full min-h-[150px] sm:min-h-[200px]">
                    <PlusCircle className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mb-2 sm:mb-4" />
                    <p className="text-base sm:text-lg font-medium text-purple-600">Add New Moment</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMoment ? 'Edit Moment' : 'Add New Moment'}</DialogTitle>
                  <DialogDescription>
                    {editingMoment ? 'Update your meaningful moment' : 'Capture a meaningful moment in your journey'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const momentData = {
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    reflection: formData.get('reflection') as string,
                    image: (formData.get('image') as File) || null,
                    values: formData.getAll('values') as string[],
                    mood: Number(formData.get('mood')),
                  };
                  
                  addOrEditMoment(momentData);
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" defaultValue={editingMoment?.title} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">What happened?</Label>
                      <Textarea id="description" name="description" defaultValue={editingMoment?.description} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reflection">Why was this meaningful?</Label>
                      <Textarea id="reflection" name="reflection" defaultValue={editingMoment?.reflection} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">
                        {editingMoment ? 'Change Image' : 'Add an Image'}
                      </Label>
                      <Input id="image" name="image" type="file" accept="image/*" />
                      {editingMoment && (
                        <img src={editingMoment.imageUrl} alt="Current" className="w-full h-32 object-cover rounded-md" />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label>Associated Values</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {values.map((value) => (
                          <div key={value.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`value-${value.id}`} 
                              name="values" 
                              value={value.id}
                              defaultChecked={!!(editingMoment?.values.includes(value.id) || (selectedValue && selectedValue.id === value.id))}
                            />
                            <Label htmlFor={`value-${value.id}`} className="text-sm">{value.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mood">Mood</Label>
                      <Slider
                        id="mood"
                        name="mood"
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[editingMoment?.mood || 3]}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">{editingMoment ? 'Update Moment' : 'Save Moment'}</Button>
                </form>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogContent>
            </Dialog>

            {/* Moment Cards */}
            {moments.map((moment) => (
              <MomentCard key={moment.id} moment={moment} onEdit={handleEditMoment} values={values} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="values">
          <div className="grid gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-600">Your Core Values</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search values..."
                    className="pl-10 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={getRandomValue} variant="outline" className="gap-2 w-full sm:w-auto">
                  <Shuffle className="w-4 h-4" />
                  Random
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="text-sm"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {/* Add New Value Card */}
              <Dialog open={showNewValueDialog} onOpenChange={setShowNewValueDialog}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[150px] sm:min-h-[200px]">
                      <PlusCircle className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mb-2 sm:mb-4" />
                      <p className="text-base sm:text-lg font-medium text-purple-600">Add New Value</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingValue ? 'Edit Value' : 'Add New Value'}</DialogTitle>
                    <DialogDescription>
                      {editingValue ? 'Update your core value' : 'Define a new core value that guides your life'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    addOrEditValue({
                      name: formData.get('name') as string,
                      description: formData.get('description') as string,
                      category: formData.get('category') as string,
                      image: (formData.get('image') as File) || null,
                      questions: [
                        formData.get('question1') as string,
                        formData.get('question2') as string,
                        formData.get('question3') as string,
                      ].filter(Boolean),
                    })
                  }}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Value Name</Label>
                        <Input id="name" name="name" defaultValue={editingValue?.name} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">What does this value mean to you?</Label>
                        <Textarea id="description" name="description" defaultValue={editingValue?.description} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" defaultValue={editingValue?.category} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">Add an Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*" />
                        {editingValue && (
                          <img src={editingValue.image} alt="Current" className="w-full h-32 object-cover rounded-md" />
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>Reflection Questions</Label>
                        <Input name="question1" placeholder="Question 1" defaultValue={editingValue?.questions[0]} />
                        <Input name="question2" placeholder="Question 2" defaultValue={editingValue?.questions[1]} />
                        <Input name="question3" placeholder="Question 3" defaultValue={editingValue?.questions[2]} />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">{editingValue ? 'Update Value' : 'Save Value'}</Button>
                  </form>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>

              {/* Value Cards */}
              {filteredValues.map((value) => (
                <ValueCard
                  key={value.id}
                  value={value}
                  onClick={() => setSelectedValue(value)}
                  onImageUpload={updateValueImage}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4 sm:mb-6">Your Journey Timeline</h2>
            {moments.sort((a, b) => b.timestamp - a.timestamp).map((moment, index) => (
              <div key={moment.id} className="mb-6 sm:mb-8 flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  {index !== moments.length - 1 && <div className="w-0.5 h-full bg-purple-300"></div>}
                </div>
                <Card className="flex-grow">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">{moment.title}</CardTitle>
                    <CardDescription className="text-sm">{new Date(moment.timestamp).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{moment.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {moment.values.map((valueId) => {
                        const value = values.find(v => v.id === valueId);
                        return value ? (
                          <span key={valueId} className={`px-2 py-1 rounded-full text-xs text-white ${value.color}`}>
                            {value.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={selectedValue !== null} onOpenChange={() => setSelectedValue(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedValue && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <span>{selectedValue.icon}</span>
                  {selectedValue.name}
                </DialogTitle>
                <DialogDescription>
                  Category: {selectedValue.category}
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedValue.image}
                  alt={selectedValue.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                {selectedValue.description}
              </p>
              <div className={`inline-flex px-3 py-1 rounded-full text-white ${selectedValue.color} text-xs sm:text-sm mt-4`}>
                {selectedValue.category}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Reflection Questions</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                  {selectedValue.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between mt-6">
                <Button onClick={() => handleEditValue(selectedValue)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Value
                </Button>
              </div>
            </>
          )}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={showGuidedReflection} onOpenChange={setShowGuidedReflection}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Guided Reflection</DialogTitle>
            <DialogDescription>
              Take a moment to reflect on your day
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-sm sm:text-base">{selectedValue?.questions[reflectionStep] || "No question available"}</p>
            <Textarea placeholder="Your thoughts..." className="min-h-[100px]" />
          </div>
          <DialogFooter>
            {reflectionStep > 0 && (
              <Button variant="outline" onClick={() => setReflectionStep(reflectionStep - 1)}>
                Previous
              </Button>
            )}
            {reflectionStep < (selectedValue?.questions.length || 0) - 1 ? (
              <Button onClick={() => setReflectionStep(reflectionStep + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={() => {
                setShowGuidedReflection(false);
                setReflectionStep(0);
                toast({
                  title: "Reflection complete",
                  description: "Your guided reflection has been saved.",
                });
              }}>
                Finish
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
        onClick={() => setShowGuidedReflection(true)}
      >
        <Sparkles className="w-6 h-6" />
      </Button>
    </div>
  )
}