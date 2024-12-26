import React, { useState } from 'react';

const foodVouchers = [
  { id: 1, name: 'Giảm 5$, thêm nhiều ưu đãi - TFP201', condition: 'Đơn hàng tối thiểu 50$', discount: 5 },
  { id: 2, name: 'Giảm 15$, thêm nhiều ưu đãi - TFP202', condition: 'Đơn hàng tối thiểu 70$', discount: 15 },
  { id: 3, name: 'Giảm 35$, thêm nhiều ưu đãi - TFP203', condition: 'Đơn hàng tối thiểu 100$', discount: 35 },
  { id: 4, name: 'Giảm 55$, thêm nhiều ưu đãi - TFP204', condition: 'Đơn hàng tối thiểu 165$', discount: 55 },
  { id: 5, name: 'Giảm 65$, thêm nhiều ưu đãi - TFP205', condition: 'Đơn hàng tối thiểu 245$', discount: 65 },
  { id: 6, name: 'Giảm 80$, thêm nhiều ưu đãi - TFP206', condition: 'Đơn hàng tối thiểu 300$', discount: 80 },
];

const superDealVouchers = [
  { id: 7, name: 'Giảm 20$, thêm nhiều ưu đãi - TFP301', condition: 'Đơn hàng tối thiểu 50$', discount: 20 },
  { id: 8, name: 'Giảm 50$, thêm nhiều ưu đãi - TFP302', condition: 'Đơn hàng tối thiểu 100$', discount: 50 },
  { id: 9, name: 'Giảm 100$, thêm nhiều ưu đãi - TFP303', condition: 'Đơn hàng tối thiểu 300$', discount: 100 },
];

const shippingVouchers = [
  { id: 10, name: 'Giảm 2$, thêm nhiều ưu đãi - TFP401', condition: 'Đơn hàng tối thiểu 50$', discount: 2 },
  { id: 11, name: 'Giảm 5$, thêm nhiều ưu đãi - TFP402', condition: 'Đơn hàng tối thiểu 100$', discount: 5 },
  { id: 12, name: 'Giảm 10$, thêm nhiều ưu đãi - TFP403', condition: 'Đơn hàng tối thiểu 300$', discount: 10 },
];

const VoucherComponent = ({ totalAmount, onUpdateTotal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodVoucher, setSelectedFoodVoucher] = useState(null);
  const [selectedSuperDealVoucher, setSelectedSuperDealVoucher] = useState(null);
  const [selectedShippingVoucher, setSelectedShippingVoucher] = useState(null);
  const [hasUsedVourcher, setHasUsedVourcher] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  };
  const closeModal = () => {
    setIsModalOpen(false)
  };

  const handleVoucherSelect = (voucherId, group) => {
    if (group === 'food') setSelectedFoodVoucher(voucherId);
    if (group === 'superDeal') setSelectedSuperDealVoucher(voucherId);
    if (group === 'shipping') setSelectedShippingVoucher(voucherId);
  };

  const applyVoucher = () => {
    let discount = 0;
    const allVouchers = [
      ...foodVouchers,
      ...superDealVouchers,
      ...shippingVouchers
    ];

    const selectedVoucher = allVouchers.filter(
      (v) =>
        v.id === selectedFoodVoucher ||
        v.id === selectedSuperDealVoucher ||
        v.id === selectedShippingVoucher
    ) ?? [];

    if (selectedVoucher?.length > 0) {
      discount = selectedVoucher.reduce((sum, voucher) => sum + voucher.discount, 0);
    }

    const newTotal = Math.max(totalAmount - discount, 0);
    setHasUsedVourcher(true);
    onUpdateTotal(newTotal);
    closeModal();
  };

  const renderVoucherGroup = (
    groupTitle,
    vouchers,
    selectedVoucher,
    groupKey,
    totalAmount
  ) => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">{groupTitle}</h4>
      <div className="grid gap-4">
        {vouchers.map((voucher) => {
          const minAmount = parseInt(voucher.condition.match(/\d+/)[0]);
          const isEligible = totalAmount >= minAmount;

          return (
            <div
              key={voucher.id}
              className={`border p-4 rounded-lg cursor-pointer flex items-center ${selectedVoucher === voucher.id && isEligible
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-100'
                } ${!isEligible ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => isEligible && handleVoucherSelect(voucher.id, groupKey)}
            >
              <input
                type="radio"
                name={groupKey}
                checked={selectedVoucher === voucher.id}
                onChange={() => isEligible && handleVoucherSelect(voucher.id, groupKey)}
                className="mr-2"
                disabled={!isEligible}
              />
              <div className='flex flex-col ml-2'>
                <div className="font-medium">{voucher.name}</div>
                <div className="text-gray-600">{voucher.condition}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mt-6 mx-8 w-full">
      <h3 className="text-lg font-semibold mb-2">Ưu đãi</h3>
      {hasUsedVourcher ?
        <div
          className="p-4 border rounded-lg shadow cursor-pointer"
        >
          <p>Bạn đã xác nhận sử dụng vourcher</p>
        </div>
        :
        <div
          className="p-4 border rounded-lg shadow cursor-pointer"
          onClick={openModal}
        >
          <p>Click để chọn voucher</p>
        </div>
      }

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-8/12 h-[80vh] flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray border-solid pb-2">Chọn Voucher</h3>
            <div className='overflow-y-scroll h-[55vh]'>
              {renderVoucherGroup(
                'Ưu đãi Deal Ngon Quán Mới',
                foodVouchers,
                selectedFoodVoucher,
                'food',
                totalAmount
              )}
              {renderVoucherGroup(
                'Ưu đãi Deal Siêu Khủng',
                superDealVouchers,
                selectedSuperDealVoucher,
                'superDeal',
                totalAmount
              )}
              {renderVoucherGroup(
                'Ưu đãi Ship Hàng',
                shippingVouchers,
                selectedShippingVoucher,
                'shipping',
                totalAmount
              )}
            </div>
            <div className='flex justify-between'>
              <button
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Bỏ qua ưu đãi và tiếp tục
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                onClick={applyVoucher}
              >
                Sử dụng voucher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherComponent;