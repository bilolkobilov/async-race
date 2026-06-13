import { useAppDispatch, useAppSelector } from '../../../store';
import {
  setCreateName, setCreateColor,
  setEditName, setEditColor, clearEdit,
  addCar, editCar, fetchCars,
} from '../../../store/garageSlice';
import styles from './CarForm.module.css';

const MAX_NAME_LENGTH = 50;

const CarForm = () => {
  const dispatch = useAppDispatch();
  const { createName, createColor, editId, editName, editColor, currentPage } = useAppSelector(
    (s) => s.garage,
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = createName.trim();
    if (!trimmed || trimmed.length > MAX_NAME_LENGTH) return;
    await dispatch(addCar({ name: trimmed, color: createColor }));
    dispatch(fetchCars(currentPage));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    const trimmed = editName.trim();
    if (!trimmed || trimmed.length > MAX_NAME_LENGTH) return;
    await dispatch(editCar({ id: editId, car: { name: trimmed, color: editColor } }));
    dispatch(fetchCars(currentPage));
  };

  return (
    <div className={styles.forms}>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          className={styles.input}
          value={createName}
          onChange={(e) => dispatch(setCreateName(e.target.value))}
          placeholder="Car name"
          maxLength={MAX_NAME_LENGTH}
        />
        <input
          type="color"
          className={styles.colorPicker}
          value={createColor}
          onChange={(e) => dispatch(setCreateColor(e.target.value))}
          aria-label="Car color"
        />
        <button className={styles.btn} type="submit" disabled={!createName.trim()}>
          Create
        </button>
      </form>

      <form className={styles.form} onSubmit={handleEdit}>
        <input
          className={styles.input}
          value={editName}
          onChange={(e) => dispatch(setEditName(e.target.value))}
          placeholder="Select a car to edit"
          maxLength={MAX_NAME_LENGTH}
          disabled={editId === null}
        />
        <input
          type="color"
          className={styles.colorPicker}
          value={editColor}
          onChange={(e) => dispatch(setEditColor(e.target.value))}
          disabled={editId === null}
          aria-label="Edit car color"
        />
        <button className={styles.btn} type="submit" disabled={editId === null || !editName.trim()}>
          Update
        </button>
        {editId !== null && (
          <button className={styles.btnCancel} type="button" onClick={() => dispatch(clearEdit())}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CarForm;
