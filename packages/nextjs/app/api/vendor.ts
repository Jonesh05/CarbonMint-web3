import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface VendorData {
  email: string;
  username: string;
  walletAddress: string;
  companyName?: string;
}

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Vendor'],
  endpoints: (builder) => ({
    checkVendor: builder.query<boolean, string>({
      query: (address) => `vendor/check/${address}`,
      providesTags: ['Vendor'],
    }),
    registerVendor: builder.mutation<void, VendorData>({
      query: (data) => ({
        url: 'vendor/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Vendor'],
    }),
  }),
});

export const { useCheckVendorQuery, useRegisterVendorMutation } = vendorApi;