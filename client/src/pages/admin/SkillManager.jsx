import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  X,
  Zap,
  Code2,
  Wrench,
  Users,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import useCrud from "@/hooks/useCrud";
import CustomSelect from "@/components/admin/CustomSelect";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";

const SKILL_TYPES = [
  { key: "tech", label: "Technologies", icon: Code2, color: "purple" },
  { key: "hardskill", label: "Hard Skills", icon: Wrench, color: "blue" },
  { key: "softskill", label: "Soft Skills", icon: Users, color: "green" },
];

const TECH_CATEGORIES = [
  { value: "Frontend Development", label: "Frontend Development" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "Fullstack Development", label: "Fullstack Development" },
  { value: "Mobile Development", label: "Mobile Development" },
  { value: "Game Development", label: "Game Development" },
  { value: "Database", label: "Database" },
  { value: "Cloud & DevOps", label: "Cloud & DevOps" },
  { value: "AI & Machine Learning", label: "AI & Machine Learning" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Graphic & UI Design", label: "Graphic & UI Design" },
  { value: "Website Development", label: "Website Development" },
  { value: "Video Editing", label: "Video Editing" },
  { value: "Motion Graphics", label: "Motion Graphics" },
  { value: "Tools & Utilities", label: "Tools & Utilities" },
  { value: "Others", label: "Others" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public (Show on About Page)" },
  { value: "private", label: "Private (Project Details Only)" },
];

const PROFICIENCY_LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

function SkillIcon({ icon }) {
  if (!icon) return <span className="text-xl">⚡</span>;
  if (icon.startsWith("http")) {
    return (
      <img
        src={icon}
        alt=""
        className="w-6 h-6 object-contain"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    );
  }
  return <span className="text-xl">{icon}</span>;
}

function SkillForm({
  onSubmit,
  onCancel,
  initial = null,
  defaultType = "tech",
}) {
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!initial;
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initial
      ? {
          name: initial.name || "",
          icon: initial.icon || "",
          type: initial.type || defaultType,
          category: initial.category || "",
          level: initial.level || "Intermediate",
          description: initial.description || "",
          year: initial.year || "",
          visibility: initial.visibility || "public",
        }
      : { type: defaultType, level: "Intermediate", visibility: "public" },
  });

  const currentType = watch("type");
  const isTech = currentType === "tech";

  const onForm = async (data) => {
    try {
      setSubmitting(true);
      const payload = { ...data };
      if (isTech) {
        // payload.level is already string from form
        delete payload.description;
        delete payload.year;
      } else {
        payload.year = data.year ? parseInt(data.year) : undefined;
        delete payload.icon;
        delete payload.category;
        delete payload.level;
      }
      await onSubmit(payload);
      onCancel();
    } catch {
      setSubmitting(false);
    }
  };

  const typeConfig =
    SKILL_TYPES.find((t) => t.key === currentType) || SKILL_TYPES[0];

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        className="relative w-[90vw] max-w-md bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-none max-h-[90vh] flex flex-col overflow-hidden"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.97 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEdit ? "Edit Skill" : `New ${typeConfig.label.slice(0, -1)}`}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center"
          >
            <X size={16} className="text-gray-500 dark:text-white/50" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onForm)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {/* Type selector */}
          <div>
            <label className="admin-label">Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  {SKILL_TYPES.map((t) => {
                    const Icon = t.icon;
                    const active = field.value === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => field.onChange(t.key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                          active
                            ? "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-500/15 dark:border-purple-500/30 dark:text-purple-400"
                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-white/5 dark:border-white/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/10"
                        }`}
                      >
                        <Icon size={14} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          {/* Name - always shown */}
          <div>
            <label className="admin-label">Name *</label>
            <input
              {...register("name", { required: "Required" })}
              className="input-field"
              placeholder={
                isTech
                  ? "React.js"
                  : currentType === "hardskill"
                    ? "UI Design"
                    : "Problem Solving"
              }
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* TECH-only fields */}
          {isTech && (
            <>
              <div>
                <label className="admin-label">Icon</label>
                <Controller
                  name="icon"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      label=""
                    />
                  )}
                />
                <p className="text-gray-400 dark:text-white/20 text-xs mt-1">
                  Upload a tech logo/icon image
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CustomSelect
                        options={TECH_CATEGORIES}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select..."
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="admin-label">Level</label>
                  <Controller
                    name="level"
                    control={control}
                    defaultValue="Intermediate"
                    render={({ field }) => (
                      <CustomSelect
                        options={PROFICIENCY_LEVELS}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select..."
                      />
                    )}
                  />
                </div>
              </div>
            </>
          )}

          {/* HARD/SOFT SKILL fields */}
          {!isTech && (
            <>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  {...register("description")}
                  className="input-field min-h-[80px] resize-none"
                  placeholder="Brief description of this skill..."
                  rows={3}
                />
              </div>
              <div>
                <label className="admin-label">Year Acquired</label>
                <input
                  {...register("year")}
                  type="number"
                  min={2000}
                  max={2030}
                  className="input-field"
                  placeholder="2023"
                />
              </div>
            </>
          )}

          {/* Visibility - for all types or specifically tech? User said tech stack, but good for all */}
          <div>
            <label className="admin-label">Visibility</label>
            <Controller
              name="visibility"
              control={control}
              defaultValue="public"
              render={({ field }) => (
                <CustomSelect
                  options={VISIBILITY_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select visibility..."
                />
              )}
            />
            <p className="text-gray-400 dark:text-white/20 text-xs mt-1">
              Private skills are hidden from the "About" page but visible in project details.
            </p>
          </div>

          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-white/10 shrink-0">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Skill"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function SkillManager() {
  const {
    items: skills,
    loading,
    addItem,
    updateItem,
    deleteItem,
  } = useCrud("/skills", "Skill");
  const [formState, setFormState] = useState({ open: false, editing: null });
  const [activeTab, setActiveTab] = useState("tech");

  const openCreate = () => setFormState({ open: true, editing: null });
  const openEdit = (item) => setFormState({ open: true, editing: item });
  const closeForm = () => setFormState({ open: false, editing: null });

  const handleSubmit = async (data) => {
    if (formState.editing) {
      await updateItem(formState.editing._id, data);
    } else {
      await addItem(data);
    }
  };

  const [deleteTarget, setDeleteTarget] = useState(null);
  const handleDelete = (id) => setDeleteTarget(id);
  const confirmDelete = async () => {
    if (deleteTarget) await deleteItem(deleteTarget);
    setDeleteTarget(null);
  };

  const filtered = skills.filter((s) => (s.type || "tech") === activeTab);
  const tabConfig = SKILL_TYPES.find((t) => t.key === activeTab);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Skills
          </h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
            Total {skills.length} expertises in your arsenal
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={18} /> <span>Add Skill</span>
        </button>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {SKILL_TYPES.map((t) => {
          const Icon = t.icon;
          const count = skills.filter(
            (s) => (s.type || "tech") === t.key,
          ).length;
          const active = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                active
                  ? "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-500/15 dark:border-purple-500/30 dark:text-purple-400"
                  : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:bg-white/5 dark:border-white/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {t.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300" : "bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-white/20"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl">
          <Zap
            size={40}
            className="text-gray-300 dark:text-white/10 mx-auto mb-3"
          />
          <p className="text-gray-500 dark:text-white/30 text-lg">
            No {tabConfig?.label.toLowerCase()} yet
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((skill) => (
            <div
              key={skill._id}
              className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl p-4 group hover:border-purple-500/30 dark:hover:border-white/10 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <SkillIcon icon={skill.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                      {skill.name}
                    </p>
                    {skill.type === "tech" ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300 rounded-full">
                          {skill.category || "General"}
                        </span>
                        {skill.visibility === "private" && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/30 rounded-full uppercase font-bold tracking-wider">
                            Private
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-gray-400 dark:text-white/30">
                          {skill.year ? `Since ${skill.year}` : ""}
                        </span>
                        {skill.visibility === "private" && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/30 rounded-full uppercase font-bold tracking-wider">
                            Private
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2">
                  <button
                    onClick={() => openEdit(skill)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-all"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-1.5 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/15 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              {skill.type === "tech" && (
                <div className="mt-2.5">
                  <div className="mt-2 text-center">
                    <div
                      className={`text-[10px] px-2 py-0.5 rounded-full inline-block ${
                        skill.level === "Beginner"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"
                          : skill.level === "Intermediate"
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300"
                            : skill.level === "Advanced"
                              ? "bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300"
                              : "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300" // Expert
                      }`}
                    >
                      {skill.level || "Intermediate"}
                    </div>
                  </div>
                </div>
              )}
              {skill.type !== "tech" && skill.description && (
                <p className="text-gray-500 dark:text-white/30 text-xs mt-2 line-clamp-2">
                  {skill.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formState.open && (
          <SkillForm
            key={formState.editing?._id || "new"}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            initial={formState.editing}
            defaultType={activeTab}
          />
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
      />
    </div>
  );
}
