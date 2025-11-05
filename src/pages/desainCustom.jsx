import React, { useRef, useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import {
  FaFont,
  FaImage,
  FaShapes,
  FaTrash,
  FaDownload,
  FaAngleUp,
  FaAngleDown,
  FaPalette,
  FaRegSun,
  FaBars,
  FaTimes,
  FaCircle,
  FaStar,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaUnderline,
  FaCopy,
  FaPaste,
  FaSmile,
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUnlock,
  FaSquare,
  FaHeart,
  FaCamera,
  FaUpload,
  FaSave,
  FaFileImage,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DesainCustom = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  
  const [activeObject, setActiveObject] = useState(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [opacity, setOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(40);
  const [textAlign, setTextAlign] = useState("left");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedObject, setCopiedObject] = useState(null);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showBgColorPalette, setShowBgColorPalette] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [layers, setLayers] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 700 });

  const fileInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // Preset colors
const colorPresets = [
  "#F8BBD0", // Soft Pink
  "#FADADD", // Light Rose
  "#FCE4EC", // Blush
  "#FFF9C4", // Light Yellow
  "#E1F5FE", // Baby Blue
  "#E0F7FA", // Mint Blue
  "#E8F5E9", // Soft Green
  "#FFF3E0", // Peach
  "#F3E5F5", // Lavender
  "#D1C4E9", // Lilac
  "#FFECB3", // Cream
  "#FFCCBC", // Soft Coral
  "#C8E6C9", // Pastel Green
  "#B3E5FC", // Sky Blue
  "#B2EBF2", // Aqua
  "#F0F4C3", // Pale Lime
  "#DCEDC8", // Light Olive
  "#FFE0B2", // Light Orange
  "#F5F5F5", // Soft Gray
  "#E0E0E0", // Cool Gray
  "#D7CCC8", // Warm Beige
  "#FBE9E7", // Blush Peach
  "#E6EE9C", // Soft Lime
  "#C5CAE9"  // Misty Blue
];

  // Background gradients
  const bgGradients = [
    { name: "Sunset", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Ocean", gradient: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)" },
    { name: "Rose", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "Peach", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    { name: "Mint", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { name: "Purple", gradient: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)" },
  ];

  // Templates
  const templates = [
    { name: "Wedding Elegant", bg: "#FFF5F5", elements: ["💍", "Pernikahan", "❤️"] },
    { name: "Birthday Party", bg: "#FFF9E6", elements: ["🎂", "Happy Birthday", "🎉"] },
    { name: "Baby Shower", bg: "#E6F7FF", elements: ["👶", "Baby Shower", "🍼"] },
    { name: "Anniversary", bg: "#FFF0F5", elements: ["💕", "Anniversary", "🌹"] },
  ];

  // Emoji list
  const emojis = [
    "❤️", "💕", "💖", "💗", "💝", "💞", "💓", "💘", "💟", "♥️",
    "🌹", "🌺", "🌸", "🌼", "🌻", "🌷", "🏵️", "💐", "🌾", "🍀",
    "✨", "⭐", "🌟", "💫", "⚡", "🔥", "💥", "🎉", "🎊", "🎈",
    "👰", "🤵", "💍", "💎", "👑", "🎀", "🎁", "🎂", "🍰", "🧁",
    "😊", "😍", "🥰", "😘", "💋", "👨‍👩‍👧‍👦", "👪", "🙏", "🤲", "✝️",
    "🕊️", "🦋", "🐝", "🌈", "☀️", "🌙", "⭐", "🌠", "🎆", "🎇"
  ];

  // Update layers list
  const updateLayers = useCallback(() => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    const layersList = objects.map((obj, index) => ({
      id: obj.id || `layer-${index}`,
      name: obj.name || `${obj.type === 'i-text' ? 'Teks' : obj.type === 'image' ? 'Gambar' : 'Bentuk'} ${index + 1}`,
      type: obj.type,
      visible: obj.visible !== false,
      locked: obj.selectable === false,
      object: obj
    }));
    setLayers(layersList.reverse());
  }, [canvas]);

  // Inisialisasi Canvas
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? Math.min(window.innerWidth - 40, 350) : canvasSize.width;
      const height = isMobile ? Math.min(window.innerHeight * 0.6, 490) : canvasSize.height;
      return { width, height };
    };

    const { width, height } = updateCanvasSize();

    const c = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: bgColor,
      selection: true,
    });

    const updateActiveObject = (e) => {
      const obj = e.target;
      if (!obj) return;
      setActiveObject(obj);
      setActiveColor(obj.fill || "#000000");
      setOpacity(obj.opacity || 1);
      setStrokeWidth(obj.strokeWidth || 0);
      setStrokeColor(obj.stroke || "#000000");
      if (obj.type === "i-text") {
        setFontFamily(obj.fontFamily || "Arial");
        setFontSize(obj.fontSize || 40);
        setTextAlign(obj.textAlign || "left");
      }
    };

    c.on("selection:created", updateActiveObject);
    c.on("selection:updated", updateActiveObject);
    c.on("selection:cleared", () => setActiveObject(null));
    c.on("object:added", updateLayers);
    c.on("object:removed", updateLayers);
    c.on("object:modified", updateLayers);
    
    setCanvas(c);

    const handleResize = () => {
      const { width: newWidth, height: newHeight } = updateCanvasSize();
      if (c.width !== newWidth || c.height !== newHeight) {
        const scaleX = newWidth / c.width;
        const scaleY = newHeight / c.height;
        
        c.setDimensions({ width: newWidth, height: newHeight });
        c.getObjects().forEach(obj => {
          obj.scaleX *= scaleX;
          obj.scaleY *= scaleY;
          obj.left *= scaleX;
          obj.top *= scaleY;
          obj.setCoords();
        });
        c.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      c.dispose();
    };
  }, [bgColor, canvasSize]);

  // Apply Template
 const applyTemplate = (template) => {
  if (!canvas) return;
  canvas.clear();

  // Set background color
  canvas.setBackgroundColor(template.bg, canvas.renderAll.bind(canvas));

  // Dapatkan ukuran canvas saat ini
  const cw = canvas.getWidth();
  const ch = canvas.getHeight();

  // Skala dinamis berdasarkan ukuran canvas (agar proporsional di HP)
  const scaleFactor = cw < 500 ? 0.5 : cw < 800 ? 0.7 : 1;

  // Title
  const title = new fabric.IText(template.elements[1], {
    fontSize: 60 * scaleFactor,
    fontFamily: "Georgia",
    fill: "#333333",
    top: ch / 2 - (80 * scaleFactor),
    fontWeight: "bold",
    id: `title-${Date.now()}`,
    name: 'Judul',
    originX: 'center',
    left: cw / 2, // selalu di tengah horizontal
  });
  canvas.add(title);

  // Emoji kiri atas
  const emoji1 = new fabric.IText(template.elements[0], {
    fontSize: 80 * scaleFactor,
    top: 50 * scaleFactor,
    left: 40 * scaleFactor,
    id: `emoji1-${Date.now()}`,
    name: 'Dekorasi 1',
  });
  canvas.add(emoji1);

  // Emoji kanan atas
  const emoji2 = new fabric.IText(template.elements[2], {
    fontSize: 80 * scaleFactor,
    top: 50 * scaleFactor,
    left: cw - (120 * scaleFactor),
    id: `emoji2-${Date.now()}`,
    name: 'Dekorasi 2',
  });
  canvas.add(emoji2);

  // Render ulang dan tutup panel template
  canvas.renderAll();
  setShowTemplates(false);
  setIsMobileMenuOpen(false);
};

  // Tambah Teks
  const addText = useCallback(() => {
    if (!canvas) return;
    const text = new fabric.IText("Teks Undangan", {
      fill: activeColor,
      fontSize: 23,
      fontFamily: fontFamily,
      top: 100,
      left: 100,
      textAlign: textAlign,
      id: `text-${Date.now()}`,
      name: 'Teks Baru'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.centerObjectH(text);
    setIsMobileMenuOpen(false);
  }, [canvas, activeColor, fontFamily, fontSize, textAlign]);

  // Tambah Heading
  const addHeading = useCallback(() => {
    if (!canvas) return;
    const text = new fabric.IText("Judul Undangan", {
      fill: activeColor,
      fontSize: 42,
      fontFamily: "Georgia",
      fontWeight: "bold",
      top: 100,
      left: 100,
      textAlign: "center",
      id: `heading-${Date.now()}`,
      name: 'Judul'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.centerObjectH(text);
    setIsMobileMenuOpen(false);
  }, [canvas, activeColor]);

  // Tambah Subheading
  const addSubheading = useCallback(() => {
    if (!canvas) return;
    const text = new fabric.IText("Subjudul", {
      fill: activeColor,
      fontSize: 36,
      fontFamily: "Times New Roman",
      fontStyle: "italic",
      top: 200,
      left: 100,
      textAlign: "center",
      id: `subheading-${Date.now()}`,
      name: 'Subjudul'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.centerObjectH(text);
    setIsMobileMenuOpen(false);
  }, [canvas, activeColor]);

  // Tambah Emoji
  const addEmoji = useCallback((emoji) => {
    if (!canvas) return;
    const text = new fabric.IText(emoji, {
      fontSize: 80,
      top: 100,
      left: 100,
      id: `emoji-${Date.now()}`,
      name: `Emoji ${emoji}`
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.centerObject(text);
    setShowEmojiPicker(false);
    setIsMobileMenuOpen(false);
  }, [canvas]);

  // Tambah Bentuk
const addShape = useCallback((shapeType = 'rectangle') => {
  if (!canvas) return;
  let shape;
  const safeColor = activeColor || "#F48FB1"; // warna fallback

  switch(shapeType) {
    case 'circle':
      shape = new fabric.Circle({
        radius: 75,
        fill: "#42A5F5",
        opacity: opacity || 1,
        stroke: strokeColor || safeColor,
        strokeWidth: strokeWidth || 2,
        id: `circle-${Date.now()}`,
        name: 'Lingkaran'
      });
      break;
    case 'triangle':
      shape = new fabric.Triangle({
        width: 150,
        height: 150,
        fill: "#5C6BC0",
        opacity: opacity || 1,
        stroke: strokeColor || safeColor,
        strokeWidth: strokeWidth || 2,
        id: `triangle-${Date.now()}`,
        name: 'Segitiga'
      });
      break;
    case 'line':
      shape = new fabric.Line([50, 50, 200, 50], {
        stroke: safeColor,
        strokeWidth: 5,
        opacity: opacity || 1,
        id: `line-${Date.now()}`,
        name: 'Garis'
      });
      break;
    case 'heart':
      const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
      shape = new fabric.Path(heartPath, {
        fill: "#F48FB1",
        opacity: opacity || 1,
        stroke: strokeColor || safeColor,
        strokeWidth: strokeWidth || 2,
        scaleX: 5,
        scaleY: 5,
        id: `heart-${Date.now()}`,
        name: 'Hati'
      });
      break;
    default:
      shape = new fabric.Rect({
        width: 300,
        height: 150,
        fill: "#AB47BC",
        opacity: opacity || 1,
        stroke: strokeColor || safeColor,
        strokeWidth: strokeWidth || 2,
        id: `rect-${Date.now()}`,
        name: 'Kotak'
      });
  }

  canvas.add(shape);
  shape.setCoords();
  canvas.centerObject(shape);
  canvas.setActiveObject(shape);
  canvas.renderAll();
  setIsMobileMenuOpen(false);
}, [canvas, activeColor, opacity, strokeColor, strokeWidth]);


  // Upload Gambar
  const addImage = useCallback((e) => {
    const file = e.target.files[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToWidth(canvas.width * 0.5);
        img.id = `image-${Date.now()}`;
        img.name = 'Gambar';
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.centerObject(img);
      });
    };
    reader.readAsDataURL(file);
    e.target.value = null;
    setIsMobileMenuOpen(false);
  }, [canvas]);

  // Layer functions
  const selectLayer = (layer) => {
    if (canvas && layer.object) {
      canvas.setActiveObject(layer.object);
      canvas.renderAll();
    }
  };

  const toggleLayerVisibility = (layer) => {
    if (canvas && layer.object) {
      layer.object.visible = !layer.object.visible;
      canvas.renderAll();
      updateLayers();
    }
  };

  const toggleLayerLock = (layer) => {
    if (canvas && layer.object) {
      const isLocked = layer.object.selectable === false;
      layer.object.selectable = isLocked;
      layer.object.evented = isLocked;
      canvas.renderAll();
      updateLayers();
    }
  };

  const deleteLayer = (layer) => {
    if (canvas && layer.object) {
      canvas.remove(layer.object);
      canvas.renderAll();
    }
  };

  const moveLayerUp = (layer) => {
    if (canvas && layer.object) {
      canvas.bringForward(layer.object);
      canvas.renderAll();
      updateLayers();
    }
  };

  const moveLayerDown = (layer) => {
    if (canvas && layer.object) {
      canvas.sendBackwards(layer.object);
      canvas.renderAll();
      updateLayers();
    }
  };

  // Hapus Objek
  const deleteObject = useCallback(() => {
    if (!canvas || !activeObject) return;
    if (activeObject.type === 'activeSelection') {
      activeObject.getObjects().forEach(obj => canvas.remove(obj));
    } else {
      canvas.remove(activeObject);
    }
    canvas.discardActiveObject();
    canvas.renderAll();
    setActiveObject(null);
  }, [canvas, activeObject]);

  // Copy & Paste
  const copyObject = useCallback(() => {
    if (!canvas || !activeObject) return;
    activeObject.clone((cloned) => {
      setCopiedObject(cloned);
    });
  }, [canvas, activeObject]);

  const pasteObject = useCallback(() => {
    if (!canvas || !copiedObject) return;
    copiedObject.clone((cloned) => {
      cloned.set({
        left: cloned.left + 20,
        top: cloned.top + 20,
        id: `${cloned.type}-${Date.now()}`,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  }, [canvas, copiedObject]);

  // Bersihkan Kanvas
  const clearCanvas = useCallback(() => {
    if (!canvas) return;
    if (window.confirm("Hapus semua objek di kanvas?")) {
      canvas.clear();
      canvas.setBackgroundColor(bgColor, canvas.renderAll.bind(canvas));
      setLayers([]);
    }
  }, [canvas, bgColor]);

  // Download
  const downloadDesign = useCallback(() => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png", quality: 1, multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `undangan-${Date.now()}.png`;
    link.click();
  }, [canvas]);

  // Save as JSON
  const saveAsJSON = useCallback(() => {
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON(['id', 'name', 'selectable', 'evented']));
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `undangan-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [canvas]);

  // Properti Objek
  const changeColor = (color) => {
    setActiveColor(color);
    if (activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
    setShowColorPalette(false);
  };

  const changeBgColor = (color) => {
    setBgColor(color);
    if (canvas) {
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
    setShowBgColorPalette(false);
  };

  const applyBgGradient = (gradient) => {
    if (!canvas) return;
    // Create a temporary div to get gradient
    const tempDiv = document.createElement('div');
    tempDiv.style.background = gradient;
    document.body.appendChild(tempDiv);
    const computed = window.getComputedStyle(tempDiv);
    const bgImage = computed.backgroundImage;
    document.body.removeChild(tempDiv);
    
    // For simplicity, we'll use solid color approximation
    // In production, you'd parse the gradient properly
    const colors = gradient.match(/#[0-9A-Fa-f]{6}/g);
    if (colors && colors.length > 0) {
      canvas.setBackgroundColor(colors[0], canvas.renderAll.bind(canvas));
    }
    setShowBgColorPalette(false);
  };

  const changeFontFamily = (e) => {
    const font = e.target.value;
    setFontFamily(font);
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontFamily", font);
      canvas.renderAll();
    }
  };

  const changeFontSize = (e) => {
    const size = parseInt(e.target.value);
    setFontSize(size);
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontSize", size);
      canvas.renderAll();
    }
  };

  const changeTextAlign = (align) => {
    setTextAlign(align);
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("textAlign", align);
      canvas.renderAll();
    }
  };

  const toggleTextStyle = (style) => {
    if (!activeObject || activeObject.type !== "i-text") return;
    
    switch(style) {
      case 'bold':
        const currentWeight = activeObject.fontWeight === 'bold' ? 'normal' : 'bold';
        activeObject.set("fontWeight", currentWeight);
        break;
      case 'italic':
        const currentStyle = activeObject.fontStyle === 'italic' ? 'normal' : 'italic';
        activeObject.set("fontStyle", currentStyle);
        break;
      case 'underline':
        activeObject.set("underline", !activeObject.underline);
        break;
    }
    canvas.renderAll();
  };
  
  const changeOpacity = (e) => {
    const op = parseFloat(e.target.value);
    setOpacity(op);
    if (activeObject) {
      activeObject.set("opacity", op);
      canvas.renderAll();
    }
  };

  const changeStrokeWidth = (e) => {
    const width = parseInt(e.target.value);
    setStrokeWidth(width);
    if (activeObject) {
      activeObject.set("strokeWidth", width);
      canvas.renderAll();
    }
  };

  const changeStrokeColor = (color) => {
    setStrokeColor(color);
    if (activeObject) {
      activeObject.set("stroke", color);
      canvas.renderAll();
    }
  };

  const bringForward = useCallback(() => {
    if (canvas && activeObject) {
      canvas.bringForward(activeObject);
      canvas.renderAll();
      updateLayers();
    }
  }, [canvas, activeObject, updateLayers]);

  const sendBackwards = useCallback(() => {
    if (canvas && activeObject) {
      canvas.sendBackwards(activeObject);
      canvas.renderAll();
      updateLayers();
    }
  }, [canvas, activeObject, updateLayers]);

  // Change canvas size
  const changeCanvasSize = (size) => {
    setCanvasSize(size);
    if (canvas) {
      canvas.setDimensions(size);
      canvas.renderAll();
    }
  };

  // Toolbar Content
  const ToolbarContent = () => (
    <>
      {/* Templates */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">📋 Template</h3>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="bg-gradient-to-r from-sky-300 to-sky-600 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaFileImage /> Pilih Template
        </button>

        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-2 gap-2"
          >
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => applyTemplate(template)}
                className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-xs"
                style={{ backgroundColor: template.bg }}
              >
                <div className="font-semibold text-gray-700">{template.name}</div>
                <div className="text-2xl mt-1">{template.elements[0]}</div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Teks Tools */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">✍️ Teks</h3>
        <button
          onClick={addHeading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm font-bold"
        >
          <FaFont /> Tambah Judul
        </button>
        <button
          onClick={addSubheading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm italic"
        >
          <FaFont /> Tambah Subjudul
        </button>
        <button
          onClick={addText}
          className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaFont /> Tambah Teks
        </button>
      </div>

      {/* Emoji */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">😊 Emoji & Ikon</h3>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaSmile /> Pilih Emoji
        </button>

        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 grid grid-cols-6 gap-2 max-h-48 overflow-y-auto"
          >
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addEmoji(emoji)}
                className="text-2xl hover:bg-gray-200 rounded p-1 transition"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </div>
        
      {/* Bentuk */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">🔷 Bentuk</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addShape('rectangle')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
          >
            <FaSquare /> Kotak
          </button>
          <button
            onClick={() => addShape('circle')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
          >
            <FaCircle /> Bulat
          </button>
          <button
            onClick={() => addShape('triangle')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
          >
            <FaStar /> Segitiga
          </button>
          <button
            onClick={() => addShape('heart')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
          >
            <FaHeart /> Hati
          </button>
          <button
            onClick={() => addShape('line')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 justify-center text-sm col-span-2"
          >
            ━ Garis
          </button>
        </div>
      </div>

      {/* Upload */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">🖼️ Media</h3>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaUpload /> Upload Gambar
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={addImage}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Layer Panel */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <button
          onClick={() => setShowLayerPanel(!showLayerPanel)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaLayerGroup /> {showLayerPanel ? 'Tutup' : 'Buka'} Layer
        </button>

        {showLayerPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-h-64 overflow-y-auto space-y-2"
          >
            {layers.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Belum ada layer</p>
            ) : (
              layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`flex items-center gap-1 p-2 rounded-lg border ${
                    activeObject === layer.object ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => selectLayer(layer)}
                    className="flex-1 text-left text-xs truncate"
                  >
                    {layer.name}
                  </button>
                  <button
                    onClick={() => toggleLayerVisibility(layer)}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={layer.visible ? "Sembunyikan" : "Tampilkan"}
                  >
                    {layer.visible ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
                  </button>
                  <button
                    onClick={() => toggleLayerLock(layer)}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={layer.locked ? "Unlock" : "Lock"}
                  >
                    {layer.locked ? <FaLock size={12} /> : <FaUnlock size={12} />}
                  </button>
                  <button
                    onClick={() => deleteLayer(layer)}
                    className="p-1 hover:bg-red-200 text-red-600 rounded"
                    title="Hapus"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Properti Objek */}
      {activeObject && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-4"
        >
          <h3 className="font-semibold text-gray-600">⚙️ Properti Objek</h3>
          
          {/* Teks Properties */}
          {activeObject.type === 'i-text' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Font</label>
                <select 
                  value={fontFamily} 
                  onChange={changeFontFamily}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Garamond">Garamond</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Brush Script MT">Brush Script MT</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Lucida Handwriting">Lucida Handwriting</option>
                  <option value="Palatino">Palatino</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Ukuran Font</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="120"
                    value={fontSize}
                    onChange={changeFontSize}
                    className="w-full cursor-pointer"
                  />
                  <span className="text-sm w-12">{fontSize}px</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Perataan</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => changeTextAlign('left')}
                    className={`flex-1 p-2 rounded-lg ${textAlign === 'left' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                  >
                    <FaAlignLeft className="mx-auto" />
                  </button>
                  <button 
                    onClick={() => changeTextAlign('center')}
                    className={`flex-1 p-2 rounded-lg ${textAlign === 'center' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                  >
                    <FaAlignCenter className="mx-auto" />
                  </button>
                  <button 
                    onClick={() => changeTextAlign('right')}
                    className={`flex-1 p-2 rounded-lg ${textAlign === 'right' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                  >
                    <FaAlignRight className="mx-auto" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Gaya Teks</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleTextStyle('bold')}
                    className="flex-1 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    <FaBold className="mx-auto" />
                  </button>
                  <button 
                    onClick={() => toggleTextStyle('italic')}
                    className="flex-1 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    <FaItalic className="mx-auto" />
                  </button>
                  <button 
                    onClick={() => toggleTextStyle('underline')}
                    className="flex-1 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    <FaUnderline className="mx-auto" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Warna Objek */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaPalette /> Warna {activeObject.type === 'line' ? 'Garis' : 'Objek'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={activeColor}
                onChange={(e) => changeColor(e.target.value)}
                className="w-16 h-10 border-none cursor-pointer rounded-lg"
              />
              <button
                onClick={() => setShowColorPalette(!showColorPalette)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm"
              >
                Pilih dari Palet
              </button>
            </div>
            
            {showColorPalette && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-6 gap-2 p-2 bg-gray-50 rounded-lg"
              >
                {colorPresets.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => changeColor(color)}
                    className="w-8 h-8 rounded-md border-2 border-gray-300 hover:border-indigo-500 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Border/Stroke untuk Bentuk */}
          {activeObject.type !== 'line' && activeObject.type !== 'i-text' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Ketebalan Border</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={strokeWidth}
                    onChange={changeStrokeWidth}
                    className="w-full cursor-pointer"
                  />
                  <span className="text-sm w-12">{strokeWidth}px</span>
                </div>
              </div>

              {strokeWidth > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Warna Border</label>
                  <div className="grid grid-cols-6 gap-2">
                    {colorPresets.slice(0, 12).map((color, index) => (
                      <button
                        key={index}
                        onClick={() => changeStrokeColor(color)}
                        className="w-8 h-8 rounded-md border-2 border-gray-300 hover:border-indigo-500 transition"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Opasitas */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaRegSun /> Transparansi
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={opacity}
                onChange={changeOpacity}
                className="w-full cursor-pointer"
              />
              <span className="text-sm w-10">{(opacity * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Copy & Paste */}
          <div className="flex gap-2">
            <button 
              onClick={copyObject} 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex justify-center items-center gap-2 text-sm"
            >
              <FaCopy /> Copy
            </button>
            <button 
              onClick={pasteObject} 
              disabled={!copiedObject}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex justify-center items-center gap-2 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaPaste /> Paste
            </button>
          </div>

          {/* Layering */}
          <div className="flex gap-2">
            <button 
              onClick={bringForward} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg flex justify-center items-center gap-1 text-sm"
            >
              <FaAngleUp /> Depan
            </button>
            <button 
              onClick={sendBackwards} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg flex justify-center items-center gap-1 text-sm"
            >
              <FaAngleDown /> Belakang
            </button>
          </div>

          <button
            onClick={deleteObject}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
          >
            <FaTrash /> Hapus Objek
          </button>
        </motion.div>
      )}

      {/* Pengaturan Background */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-600">🎨 Background</h3>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => changeBgColor(e.target.value)}
            className="w-16 h-10 border-none cursor-pointer rounded-lg"
          />
          <button
            onClick={() => setShowBgColorPalette(!showBgColorPalette)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm"
          >
            Pilih Warna/Gradien
          </button>
        </div>

        {showBgColorPalette && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-6 gap-2">
              {colorPresets.map((color, index) => (
                <button
                  key={index}
                  onClick={() => changeBgColor(color)}
                  className="w-8 h-8 rounded-md border-2 border-gray-300 hover:border-indigo-500 transition"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500 mb-2">Gradien:</p>
              <div className="grid grid-cols-2 gap-2">
                {bgGradients.map((grad, index) => (
                  <button
                    key={index}
                    onClick={() => applyBgGradient(grad.gradient)}
                    className="h-10 rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition"
                    style={{ background: grad.gradient }}
                    title={grad.name}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Ukuran Kanvas */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">📐 Ukuran Kanvas</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => changeCanvasSize({ width: 500, height: 700 })}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-xs"
          >
            Portrait<br/>500×700
          </button>
          <button
            onClick={() => changeCanvasSize({ width: 700, height: 500 })}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-xs"
          >
            Landscape<br/>700×500
          </button>
          <button
            onClick={() => changeCanvasSize({ width: 600, height: 600 })}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-xs"
          >
            Square<br/>600×600
          </button>
        
        </div>
      </div>

      {/* Aksi */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-600">💾 Simpan & Export</h3>
        <button
          onClick={saveAsJSON}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaSave /> Simpan Project
        </button>
        <button
          onClick={downloadDesign}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm font-semibold"
        >
          <FaDownload /> Download PNG
        </button>
        <button
          onClick={clearCanvas}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center text-sm"
        >
          <FaTrash /> Hapus Semua
        </button>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white/30 backdrop-blur-3xl w-full rounded-4xl">
      {/* Header Mobile */}
      <div className="lg:hidden bg-white border-b border-gray-300 shadow-sm p-3 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-700">💌 Editor Undangan</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center flex-1 p-4 lg:p-6 gap-4 lg:gap-6">
        {/* Sidebar Desktop */}
        <div className="hidden lg:flex flex-col w-80 gap-4 max-h-screen overflow-y-auto pb-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-sky-600 to-sky-300 text-white p-6 rounded-2xl shadow-lg flex flex-row justify-center  items-center"
          >
            <h1 className="text-xl font-bold mb-1"> Custom Undangan</h1>
            <p className="text-sm opacity-90">Made By Seven Company</p>
          </motion.div>
          <ToolbarContent />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black z-10"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="lg:hidden fixed left-0 top-14 bottom-0 w-80 bg-white shadow-2xl z-20 overflow-y-auto p-4 flex flex-col gap-4"
              >
                <ToolbarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Canvas Area */}
        <div 
          ref={canvasContainerRef}
          className="flex-1 flex justify-center items-start w-full"
        >
          <div className="bg-white border-2 border-gray-200 shadow-2xl rounded-3xl p-4 lg:p-6 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="rounded-xl shadow-lg max-w-full"
            />
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Mobile) */}
      <div className="lg:hidden fixed bottom-6 right-4 flex flex-col gap-3">
        {activeObject && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={deleteObject}
            className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:bg-red-600"
          >
            <FaTrash size={20} />
          </motion.button>
        )}
        <button
          onClick={downloadDesign}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-600"
        >
          <FaDownload size={20} />
        </button>
      </div>
    </div>
  );
};

export default DesainCustom;