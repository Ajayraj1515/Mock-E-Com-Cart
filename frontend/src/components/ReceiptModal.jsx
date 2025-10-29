import './Modal.css';
import { formatINR } from '../utils/currency.js';

export default function ReceiptModal({ open, onClose, receipt }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Order Receipt</h3>
        <p><strong>Order ID:</strong> {receipt.orderId}</p>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Email:</strong> {receipt.email}</p>
        <ul className="receipt-items">
          {receipt.items.map((i) => (
            <li key={i.id}>{i.qty} x {i.name} - {formatINR(i.subtotal)}</li>
          ))}
        </ul>
        <div className="total">Total: {formatINR(receipt.total)}</div>
        <div className="timestamp">{new Date(receipt.timestamp).toLocaleString()}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


