-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Waste types policies (public read, admin write)
CREATE POLICY "Anyone can view waste types" ON public.waste_types
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage waste types" ON public.waste_types
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Facilities policies
CREATE POLICY "Anyone can view active facilities" ON public.facilities
  FOR SELECT USING (status = 'active');

CREATE POLICY "Facility managers can update their facilities" ON public.facilities
  FOR UPDATE USING (
    manager_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all facilities" ON public.facilities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Collection routes policies
CREATE POLICY "Users can view collection routes" ON public.collection_routes
  FOR SELECT USING (true);

CREATE POLICY "Collectors can update their routes" ON public.collection_routes
  FOR UPDATE USING (
    collector_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'collector')
    )
  );

CREATE POLICY "Admins and collectors can manage routes" ON public.collection_routes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'collector')
    )
  );

-- Waste collections policies
CREATE POLICY "Users can view their own collections" ON public.waste_collections
  FOR SELECT USING (
    resident_id = auth.uid() OR 
    collector_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'collector')
    )
  );

CREATE POLICY "Residents can create collections" ON public.waste_collections
  FOR INSERT WITH CHECK (resident_id = auth.uid());

CREATE POLICY "Collectors can update collections" ON public.waste_collections
  FOR UPDATE USING (
    collector_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'collector')
    )
  );

-- Facility waste logs policies
CREATE POLICY "Facility staff can view their facility logs" ON public.facility_waste_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.facilities f
      JOIN public.profiles p ON f.manager_id = p.id
      WHERE f.id = facility_id AND p.id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Facility staff can manage their logs" ON public.facility_waste_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.facilities f
      JOIN public.profiles p ON f.manager_id = p.id
      WHERE f.id = facility_id AND p.id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Community reports policies
CREATE POLICY "Users can view all reports" ON public.community_reports
  FOR SELECT USING (true);

CREATE POLICY "Users can create reports" ON public.community_reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Users can update their own reports" ON public.community_reports
  FOR UPDATE USING (
    reporter_id = auth.uid() OR 
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Training modules policies
CREATE POLICY "Users can view published modules" ON public.training_modules
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all modules" ON public.training_modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User training progress policies
CREATE POLICY "Users can view their own progress" ON public.user_training_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON public.user_training_progress
  FOR ALL USING (user_id = auth.uid());
